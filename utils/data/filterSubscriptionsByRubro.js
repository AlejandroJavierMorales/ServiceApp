const filterSubscriptionsByRubro = (subscriptions, rubroSelected = {}, description = '') => {

    // Funcion que verifica el match entre descriptions y subscriptions[i].keywords
    const matchesDescription = (keywords, description) => {
        if (!keywords || !description) return false; // No match if there's no description
        const phrases = keywords.split(',').map(phrase => phrase.trim().toLowerCase());
        return phrases.some(phrase => description.toLowerCase().includes(phrase));
    };

    let filteredSubscriptions = [];



    if (rubroSelected?.id !== '' && description === '') { // si busca solo por rubro
        filteredSubscriptions = subscriptions.filter(subscription => {
            return (
                (subscription.category_id === rubroSelected.category_id || rubroSelected.category_id === undefined) &&
                (subscription.subcategory_id === rubroSelected.subcategory_id || rubroSelected.subcategory_id === undefined) &&
                (subscription.subsubcategory_id === rubroSelected.subsubcategory_id || rubroSelected.subsubcategory_id === undefined)
            );
        });
        return filteredSubscriptions;
    } else if (description !== '' && rubroSelected?.id === '') { //si busca solo por descripcion
        filteredSubscriptions = subscriptions.filter(subscription => {
            return matchesDescription(subscription.keywords || '', description);
        });
        return filteredSubscriptions;
    } else if (description !== '' && rubroSelected?.id !== '') { //busca por rubro y descripcion
        filteredSubscriptions = subscriptions.filter(subscription => {
            return (
                (subscription.category_id == rubroSelected.category_id || rubroSelected.category_id === undefined) &&
                (subscription.subcategory_id == rubroSelected.subcategory_id || rubroSelected.subcategory_id === undefined) &&
                (subscription.subsubcategory_id == rubroSelected.subsubcategory_id || rubroSelected.subsubcategory_id === undefined)
            );
        });

        filteredSubscriptions = filteredSubscriptions.filter(subscription => {
            return matchesDescription(subscription.keywords, description);
        });
        return filteredSubscriptions;
    } else if (description === '' && rubroSelected?.id === '') { //si no hay criterio de busqueda
        return [];
    }
}

export default filterSubscriptionsByRubro;
