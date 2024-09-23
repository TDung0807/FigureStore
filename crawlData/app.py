import requests
from bs4 import BeautifulSoup
import re
import json

# URL of the page to scrape (replace with actual page URL)
ROOTURL = "https://mfigure.com"
url = "https://mfigure.com/nendoroid"

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    products = soup.find_all('div', class_="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 product-grid-item-lm mb-3")
    
    items = []  # List to hold all item data

    for product in products:
        product_link_tag = product.find('a', class_='thumb')
        product_link = product_link_tag['href'] if product_link_tag else None
        
        if product_link:
            purl = ROOTURL + product_link
            presponse = requests.get(purl)
            psoup = BeautifulSoup(presponse.text, 'html.parser')
            
            # Title
            tag_title = psoup.find('h1', class_='product-name font-weight-bold text-uppercase mb-3 pt-2').text if psoup.find('h1', class_='product-name font-weight-bold text-uppercase mb-3 pt-2') else None
            
            # Image
            tag_status_img_tag = psoup.find('span', class_='tag-status').find('img') if psoup.find('span', class_='tag-status') else None
            tag_status_img_url = tag_status_img_tag['src'] if tag_status_img_tag else None
            
            # Price
            tag_price = psoup.find('span', class_='special-price m-0').text if psoup.find('span', class_='special-price m-0') else None
            price_int = int(tag_price.replace('.', '').replace('₫', '')) if tag_price else None
            
            tags_p = psoup.find_all('p')
            for tag_p in tags_p:
                detail = tag_p.text
                if 'THÔNG TIN SẢN PHẨM' in detail:
                    name_match = re.search(r'Tên Sản Phẩm\s*:\s*(.+)', detail)
                    brand_match = re.search(r'Hãng\s*:\s*(.+)', detail)
                    material_match = re.search(r'Chất Liệu\s*:\s*(.+)', detail)
                    height_match = re.search(r'Chiều Cao\s*:\s*(.+)', detail)
                    release_date_match = re.search(r'Ngày Phát Hành\s*:\s*(.+)', detail)

                    # Getting the extracted values
                    Item = {
                        "Name": name_match.group(1).strip() if name_match else None,
                        "Brand": brand_match.group(1).strip() if brand_match else None,
                        "Material": material_match.group(1).strip() if material_match else None,
                        "Height": height_match.group(1).strip() if height_match else None,
                        "Release_date": release_date_match.group(1).strip() if release_date_match else None,
                        "Title": tag_title,
                        "URL": purl,
                        "ImageURL": ROOTURL + tag_status_img_url if tag_status_img_url else None,
                        "Price": price_int
                    }

            items.append(Item)

    # Write items list to a JSON file
    with open('products.json', 'w', encoding='utf-8') as json_file:
        json.dump(items, json_file, ensure_ascii=False, indent=4)

    print("Data written to products.json")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
