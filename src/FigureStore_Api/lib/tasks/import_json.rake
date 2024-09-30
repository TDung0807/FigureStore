namespace :import do
    desc "Import figures data from JSON file"
    task figures: :environment do
      file_path = Rails.root.join('../../crawlData/products.json')
      file = File.read(file_path)
      json_data = JSON.parse(file)
      json_data.each do |data|
        Figure.create!(
          id: data["ID"],
          name: data['Name'],
          brand: data['Brand'],
          material: data['Material'],
          price: data['Price'],
          height: data['Height'],
          release_date: data['Release_date'],
          title: data['Title'],
          url: data['URL'],
          image_url: data['ImageURL']
        )
      end
  
      puts "Imported JSON data into the database successfully."
    end
  end