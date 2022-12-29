import HouseList1 from "./HouseListPage/HouseList1"
import HouseList2 from "./HouseListPage/HouseList2"
import HouseList3 from "./HouseListPage/HouseList3"

const houseListData = {
    textAdress: 'example address',
    city: 'Plaats',
    houseChoice: 'Woningtype',
    bedRooms: 'Slaapkamers',
    surface: 'Oppervlakte',
    backWebButton: 'Terug naar de website', 
    aanbodButton: 'Aanbod',
    citySelect: 'Breda',
    houseType: 'Appartement',
    alertPage: 'Er zijn geen huizen gevonden, pas uw zoekopties aan en probeer het opnieuw.',
    choiceList: [
        HouseList1,
        HouseList2,
        HouseList3
    ]
}

export default houseListData