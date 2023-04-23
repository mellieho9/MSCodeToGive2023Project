import pytest
from Route import nearestUnvisited, calculateDistance
from backend.Partner import Partner
from Order import Order

class TestRoute:
    def test_calculateDistance(self):
        partner1 = Partner("partner1", "10001-0001")
        partner2 = Partner("partner2", "10001-0003")
        assert calculateDistance(partner1, partner2) > 20

    def test_nearby_unvisited(self):
        partner1 = Partner("partner1", "new york")
        partner2 = Order(Partner("partner2", "newark"), 2000)
        partner3 = Order(Partner("partner3", "jersey city"), 2000)

        assert nearestUnvisited(partner1, [partner2, partner3], [False, False]) == 1


if __name__ == '__main__':
    pytest.main()
