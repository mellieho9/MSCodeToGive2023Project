import geopy
geolocator = geopy.Nominatim(user_agent="check_1")
class PartnerOrder:
    def __init__(self, name, address, city, zipcode, longitude, latitude):
        self.name = name
        self.address = address
        self.city = city
        self.zipcode = zipcode
        self.longitude = longitude
        self.latitude = latitude
    
    def __init__(self, name, zipcode):
        self.name = name
        self.zipcode = zipcode
        location = geolocator.geocode(zipcode)
        self.latitude = location.latitude
        self.longitude = location.longitude

    def printPartner(self):
        print(self.name, self.zipcode, self.latitude, self.longitude)