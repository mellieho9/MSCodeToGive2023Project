import pytest
from route import nearest_unvisited, calculate_distance
from backend.partner import Partner
from order import Order


class TestRoute:
    def test_calculate_distance(self):
        partner1 = Partner("partner1", "10001-0001")
        partner2 = Partner("partner2", "10001-0003")
        assert calculate_distance(partner1, partner2) > 20

    def test_nearby_unvisited(self):
        partner1 = Partner("partner1", "323 Inman St, Ringgold, Georgia, 30736")
        partner2 = Order(Partner("partner2", "401 Peters St, Calhoun, Georgia, 30701"), 2000)
        partner3 = Order(Partner("partner3", "1411 Rome Rd SW, Calhoun, Georgia, 30701"), 2000)
        assert nearest_unvisited(partner1, [partner2, partner3], [False, False]) == 0


if __name__ == '__main__':
    pytest.main()
