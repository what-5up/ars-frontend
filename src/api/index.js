export {
    getAccountTypes,
    addAccountType,
    updateAccountType,
    deleteAccountType
} from './account-types'

export {
    addGuest
} from './guest-api'

export {
    addPassengers
} from './passenger-api'

export {
    getPassengersByFlightNo,
    getBookingsByPassengerType,
    getPassengerCountByDest,
    getRevenueByAircraftModel,
    getPastFlightDetails
} from './report-api'

export {
    getRoutes,
    getRoute
} from './route-api'

export {
    getScheduledFlights,
    addScheduledFlight,
    updateScheduledFlight,
    deleteScheduledFlight,
    getSeatMap
} from './scheduled-flight-api'

export {
    login
} from './session-api'

export {
    getTravelerClasses
} from './traveller-class-api'

export {
    getUser,
    addUser,
    updateUser,
    deleteUser
} from './user-api'

