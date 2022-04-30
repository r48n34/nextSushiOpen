export interface StoreInfo {
    id: number;
    storeStatus: string;
    name: string;
    nameKana: string;
    nameEn: string;
    address: string;
    area: string;
    latitude: number;
    longitude: number;
    distance: string;
    sortOrder: number;
    wait: number;
    waitTimeCounter: number;
    waitTimeCap: number;
    netTicketStatus: string;
    reservationStatus: string;
    checkinStatus: string;
    requireNetTicketLogin: boolean;
    forceLocalMode: boolean;
    counterReservationsAllowed: boolean;
    cancellationMobileMinutes: number;
    cancellationReservationMinutes: number;
    tablesCapacity: number;
    countersCapacity: number;
    maxCustomersMobileTable: number;
    minCustomersMobileTable: number;
    maxCustomersMobileCounter: number;
    minCustomersMobileCounter: number;
    maxCustomersReservationTable: number;
    minCustomersReservationTable: number;
    maxCustomersReservationCounter: number;
    minCustomersReservationCounter: number;
    isAgs: boolean;
    waitingGroup: number;
    localTicketingStatus: string;
    clientVersion: string;
    region: string;
}

export interface StoreQueueReduce{
    id: number;
    name: string;
    storeStatus: string;
    wait: number;
    waitingGroup: number;
}

export interface StoreQueue {
    boothQueue: string[];
    storeQueue: string[];
    counterQueue: any[];
    mixedQueue: string[];
    reservationQueue: any[];
}