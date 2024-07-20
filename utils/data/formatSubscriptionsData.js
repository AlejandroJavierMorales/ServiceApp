const formatSubscriptionsData = (
    categories,
    subcategories,
    subsubcategories,
    publishers,
    subscriptions,
    subscriptions_categories,
    subscriptions_type
) => {
    const formattedData = [];

    // Recorrer cada suscripción
    if (subscriptions && subscriptions?.length > 0) {
        subscriptions.forEach((subscription) => {
            const publisher = publishers?.find((p) => p.id === subscription?.publisher);

            if (publisher) {
                const subscription_type = subscriptions_type?.find(
                    (st) => st.id === publisher.suscription_type
                );

                const categoriesData = subscriptions_categories?.filter(
                    (sc) => sc.subscription_id === subscription.id
                );

                const category_ids = categoriesData?.map((sc) => sc.category_id);
                const subcategory_ids = categoriesData?.map((sc) => sc.subcategory_id);
                const subsubcategory_ids = categoriesData?.map(
                    (sc) => sc.subsubcategory_id
                );

                const subscription_categories = categories?.filter((cat) =>
                    category_ids?.includes(cat.id)
                );

                const subscription_subcategories = subcategories?.filter((subcat) =>
                    subcategory_ids?.includes(subcat.id)
                );

                const subscription_subsubcategories = subsubcategories?.filter(
                    (subsubcat) => subsubcategory_ids?.includes(subsubcat?.id)
                );

                const formattedSubscription = {
                    publisher_id: publisher?.id,
                    publisher_creationdate: publisher?.creationdate,
                    firstname: publisher?.firstname,
                    lastname: publisher?.lastname,
                    status: publisher?.status || null,
                    street: publisher?.street,
                    city: publisher?.city,
                    state: publisher?.state,
                    country: publisher?.country,
                    suscription_type: publisher?.suscription_type,
                    username: publisher?.username,
                    password: publisher?.password,
                    coordinates: publisher?.coordinates,
                    rating: publisher?.rating,
                    eshoop: publisher?.eshoop,
                    description1: publisher?.description1,
                    description2: publisher?.description2 || null,
                    profileimage: publisher?.profileimage || null,
                    keywords: publisher?.keywords || null,
                    web: publisher?.web || null,
                    ig: publisher?.ig || null,
                    fb: publisher?.fb || null,
                    phone: publisher?.phone || null,
                    whatsapp: publisher?.whatsapp,
                    email1: publisher?.email1,
                    email2: publisher?.email2 || null,
                    profile_image: publisher?.profile_image,
                    delivery: publisher?.delivery,
                    company_name: publisher?.company_name || null,
                    images: publisher?.images,
                    subscription_id: subscription?.id,
                    subscription_creationdate: subscription?.creationdate,
                    subscription_type: subscription?.subscription_type,
                    subscription_publisher_id: subscription?.publisher,
                    subscription_price: parseFloat(subscription?.price),
                    subscription_expiration_date: subscription?.expiration_date,
                    subscription_modality: subscription?.modality || null,
                    subscription_type_name: subscription_type ? subscription_type?.name : null,
                    subscription_type_description: subscription_type ? subscription_type?.description : null,
                    subscription_monthly_price: subscription_type ? parseFloat(subscription_type?.monthly_price) : null,
                    subscription_annual_price: subscription_type ? parseFloat(subscription_type?.annual_price) : null,
                    subscription_promotional_price: subscription_type ? parseFloat(subscription_type?.promotional_price) : null,
                    category_id: subscription_categories?.length > 0 ? subscription_categories[0]?.id : null,
                    category_name: subscription_categories?.length > 0 ? subscription_categories[0]?.name : null,
                    subcategory_id: subscription_subcategories?.length > 0 ? subscription_subcategories[0]?.id : null,
                    subcategory_name: subscription_subcategories?.length > 0 ? subscription_subcategories[0]?.name : null,
                    subsubcategory_id: subscription_subsubcategories?.length > 0 ? subscription_subsubcategories[0]?.id : null,
                    subsubcategory_name: subscription_subsubcategories?.length > 0 ? subscription_subsubcategories[0]?.name : null
                };

                formattedData?.push(formattedSubscription);
            }
        });
    }

    return formattedData;
};

export {formatSubscriptionsData};