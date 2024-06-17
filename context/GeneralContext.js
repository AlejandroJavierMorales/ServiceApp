import { createContext, useState } from "react";



const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);
    const [subCategorySelected, setSubCategorySelected] = useState(null);
    const [subSubCategorySelected, setSubSubCategorySelected] = useState(null);
    const [subCategoriesSelected, setSubCategoriesSelected] = useState(null);
    const [subSubCategoriesSelected, setSubSubCategoriesSelected] = useState(null);
    const [categoriesLeftJoinSubCategories, setCategoriesLeftJoinSubCategories] = useState([]);
    const [categoriesLeftJoinSubCategoriesLeftJoinSubSubCategories, setCategoriesLeftJoinSubCategoriesLeftJoinSubSubCategories] = useState([])
    const [dataOfServer, setDataOfServer] = useState([]); //Datos traidos del server en la consulta a levantar la aplicacion
    const [viewCategories, setViewCategories] = useState(true); //Musetra/Oculta las cards de categorias
    const [viewSubCategories, setViewSubCategories] = useState(false) //Musetra/Oculta las cards de subCategorias
    const [viewSubSubCategories, setViewSubSubCategories] = useState(false)
    const [suscriptorSelected, setSuscriptorSelected] = useState({});
    const [errorPromise, setErrorPromise] = useState('');
    const [changeSubCategorySelected, setChangeSubCategorySelected] = useState({});
    const [logged, setLogged] = useState(false);
    const [userLogged, setUserLogged] = useState({});
    const [myLocation, setMyLocation] = useState(null);
    const [myCoordinates, setMyCoordinates] = useState([]);
    const [citySelected, setCitySelected] = useState('');
    const [subscriptionsList, setSubscriptionsList] = useState([]);
    const [subscriptionsType, setSubscriptionsType] = useState(null);
    const [show, setShow] = useState('map');
    const [coordCenter, setCoordCenter] = useState([-31.97604038052301, -64.55917444398871]);
    const [myFavorites, setMyFavorites] = useState([]);
    const [actualPage, setActualPage] = useState('home');
    const [scheduleItem, setScheduleItem] = useState(null);
    const [scheduledItems, setScheduledItems] = useState([]);
    const [arrayPublishers, setArrayPublishers] = useState([]);
    const [publisherDetail, setPublisherDetail] = useState(null)

    return (
        <GeneralContext.Provider value={{
            categories, setCategories, subCategories, setSubCategories,
            categorySelected, setCategorySelected, subCategorySelected, setSubCategorySelected,
            suscriptorSelected, setSuscriptorSelected, errorPromise, setErrorPromise,
            subCategoriesSelected, setSubCategoriesSelected,
            categoriesLeftJoinSubCategories, setCategoriesLeftJoinSubCategories,
            categoriesLeftJoinSubCategoriesLeftJoinSubSubCategories, setCategoriesLeftJoinSubCategoriesLeftJoinSubSubCategories,
            dataOfServer, setDataOfServer, viewCategories, setViewCategories,
            subSubCategoriesSelected, setSubSubCategoriesSelected,
            viewSubCategories, setViewSubCategories,
            subSubCategorySelected, setSubSubCategorySelected,
            viewSubSubCategories, setViewSubSubCategories,
            changeSubCategorySelected, setChangeSubCategorySelected,
            logged, setLogged,
            userLogged, setUserLogged,
            myLocation, setMyLocation,
            myCoordinates, setMyCoordinates,
            citySelected, setCitySelected,
            subscriptionsList, setSubscriptionsList,
            subscriptionsType, setSubscriptionsType,
            show, setShow,
            coordCenter, setCoordCenter,
            myFavorites, setMyFavorites,
            actualPage, setActualPage,
            scheduleItem, setScheduleItem,
            scheduledItems, setScheduledItems,
            arrayPublishers, setArrayPublishers,
            publisherDetail, setPublisherDetail
        }}>
            {children}
        </GeneralContext.Provider>
    )

}
export { GeneralContext, GeneralContextProvider }