import pytest
from Route import nearestUnvisited, calculateDistance
from backend.Partner import PartnerOrder

class TestRoute:
    def test_calculateDistance(self):
        partner1 = PartnerOrder("partner1", "10001-0001")
        partner2 = PartnerOrder("partner2", "10001-0003")
        assert calculateDistance(partner1, partner2) > 20

    def test_nearby_unvisited(self):
        partner1 = PartnerOrder("partner1", "new york")
        partner2 = PartnerOrder("partner2", "newark")
        partner3 = PartnerOrder("partner3", "jersey city")

        assert nearestUnvisited(partner1, [partner2, partner3], [False, False]) == 1


if __name__ == '__main__':
    pytest.main()
