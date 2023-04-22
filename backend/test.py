import pytest
from Route import calculateDistance
from backend.Partner import PartnerOrder

class TestRoute:
    def test_calculateDistance(self):
        partner1 = PartnerOrder("partner1", "10001-0001")
        partner2 = PartnerOrder("partner2", "10001-0003")
        assert calculateDistance(partner1, partner2) > 20

if __name__ == '__main__':
    pytest.main()
