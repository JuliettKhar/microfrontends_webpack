import {mount} from 'marketing/MarketingApp';
import React, {useRef, useEffect} from "react";
import {useHistory} from "react-router-dom";

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({location}) => {
                const {pathname} = history.location;

                if (pathname !== location.pathname) {
                    history.push(location.pathname)
                }
                console.log(location)
            }
        });

        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref}/>
}
