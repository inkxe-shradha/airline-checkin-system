export interface MenuItem {
    id: string;
    name: string;
    icon: string;
    url: string;
    isAdminAccess: boolean;
    isUserAccess: boolean;
}

const menuList: MenuItem[] = [
    {
        id: '1',
        name: 'Dashboard',
        icon: 'dashboard',
        url: '/dashboard',
        isAdminAccess: true,
        isUserAccess: true
    },
    {
        id: '2',
        name: "Passenger List",
        icon: 'people',
        url: '/passenger-list',
        isAdminAccess: false,
        isUserAccess: false
    },
    {
        id: '3',
        name: "Ancillary services",
        icon: 'local_shipping',
        url: '/ancillary-services',
        isAdminAccess: false,
        isUserAccess: false
    },
    {
        id: '4',
        name: "Check In",
        icon: 'how_to_reg',
        url: '/checked-in',
        isAdminAccess: false,
        isUserAccess: true
    },
    {
        id: '5',
        name: "In Flight",
        icon: 'flight_takeoff',
        url: '/in-flight',
        isAdminAccess: false,
        isUserAccess: true
    }
];

export default menuList;