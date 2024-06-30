/* import useGeneralContext from '../../hooks/useGeneralContext'; */
/* import subscriptions from './subscriptions.json'; */

const fetchSubscriptions = async (subscriptions, category, subcategory, subsubcategory) => {

  /* const {subscriptions, setSubscritions} = useGeneralContext([]); */

  if(category === null && subsubcategory === null && subcategory === null) return [];

  let filteredSubscriptions =[];

  if(subsubcategory === null && subcategory === null){
    //traer publhers de category
    filteredSubscriptions = subscriptions.filter(subscription => subscription.category_id === category);
  }else if(subsubcategory === null){
    //traer publishers de subcategory
    filteredSubscriptions = subscriptions.filter(subscription => subscription.category_id === category && subscription.subcategory_id === subcategory );
  }else{
    //traer publishers de subsubcategory
    filteredSubscriptions = subscriptions.filter(subscription => subscription.category_id === category && subscription.subcategory_id === subcategory && subscription.subsubcategory_id === subsubcategory);
  }
  return filteredSubscriptions;

};

export default fetchSubscriptions;