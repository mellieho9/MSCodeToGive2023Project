import geopy

geolocator = geopy.Nominatim(user_agent="check_1", timeout=10)


class PartnerOrder:
    def __init__(self, name, address, longitude=0, latitude=0):
        self.name = name
        self.zipcode = address
        if longitude == 0 and latitude == 0:
            location = geolocator.geocode(address)
            self.longitude = location.longitude
            self.latitude = location.latitude
        else:
            self.longitude = longitude
            self.latitude = latitude

    def printPartner(self):
        print(self.name, self.zipcode, self.latitude, self.longitude)
