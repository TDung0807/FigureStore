import requests
from bs4 import BeautifulSoup
import re
import json
from playwright.sync_api import sync_playwright
from datetime import datetime

# URL of the page to scrape (replace with actual page URL)
ROOTURL = "https://mfigure.com"
url = "https://mfigure.com/nendoroid"

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    products = soup.find_all('div', class_="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 product-grid-item-lm mb-3")
    
    items = []  # List to hold all item data

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        for product in products:
            product_link_tag = product.find('a', class_='thumb')
            product_link = product_link_tag['href'] if product_link_tag else None
            
            if product_link:
                purl = ROOTURL + product_link
                presponse = requests.get(purl)
                psoup = BeautifulSoup(presponse.text, 'html.parser')

                # Navigate to product page using Playwright to extract the product ID
                page.goto(purl)
                product_id = page.evaluate("() => meta.product.id")
                
                # Title
                tag_title = psoup.find('h1', class_='product-name font-weight-bold text-uppercase mb-3 pt-2').text if psoup.find('h1', class_='product-name font-weight-bold text-uppercase mb-3 pt-2') else None
                
                # Image URL
                tag_status_img_tag = psoup.find('picture', class_='position-relative d-block aspect ratio1by1 modal-open').find('img') if psoup.find('picture', class_='position-relative d-block aspect ratio1by1 modal-open') else None
                imgurl = tag_status_img_tag['src']
                tag_status_img_url = tag_status_img_tag['src'] if tag_status_img_tag else None
                
                # Price
                tag_price = psoup.find('span', class_='special-price m-0').text if psoup.find('span', class_='special-price m-0') else None
                price_int = int(tag_price.replace('.', '').replace('₫', '')) if tag_price else None
                
                # Product details (brand, material, height, etc.)
                tags_p = psoup.find_all('p')
                name_match = brand_match = material_match = height_match = release_date_match = None
                for tag_p in tags_p:
                    detail = tag_p.text
                    if 'THÔNG TIN SẢN PHẨM' in detail:
                        name_match = re.search(r'Tên Sản Phẩm\s*:\s*(.+)', detail)
                        brand_match = re.search(r'Hãng\s*:\s*(.+)', detail)
                        material_match = re.search(r'Chất Liệu\s*:\s*(.+)', detail)
                        height_match = re.search(r'Chiều Cao\s*:\s*(.+)', detail)
                        release_date_match = re.search(r'Ngày Phát Hành\s*:\s*(.+)', detail)
                
                date_text = release_date_match.group(1).strip() if release_date_match else "T1/2024"
                release_date = date_text.replace("T", "")
                date_string = f"{release_date[-4:]}-01-{release_date[0]:02}"
                
                # Construct the item dictionary
                item = {
                    "ID": str(product_id),
                    "Name": name_match.group(1).strip() if name_match else None,
                    "Brand": brand_match.group(1).strip() if brand_match else None,
                    "Material": material_match.group(1).strip() if material_match else None,
                    "Height": height_match.group(1).strip() if height_match else None,
                    "Release_date": date_string,
                    "Title": tag_title,
                    "URL": purl,
                    "ImageURL": tag_status_img_url,
                    "Price": price_int
                }

                items.append(item)
        
        browser.close()

    # Write items list to a JSON file
    with open('crawlData\products.json', 'w', encoding='utf-8') as json_file:
        json.dump(items, json_file, ensure_ascii=False, indent=4)

    print("Data written to products.json")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
