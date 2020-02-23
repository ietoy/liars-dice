import React, { Component, createContext } from "react";
//imports react dependencies

import API from "../src/utils/API";
//object destructing into a provider and consumer
const { Provider, Consumer } = createContext();

//HAVE TO DEFINE PROVIDER BECAUSE ITS PROVIDING, DONT HAVE TO DEFINE CONSUMER BECAUSE ITS JUST USING THOSE VALUES
//consumer is useless without provider
class ConfigProvider extends Component {

    //sets the global state variables we need
    state = {
        loggedIn: false,
        currentUser: {},
        marketplace_items: [],
        cart: {
            cartCost: 0
        },
        gallery: [],
        bet: 0,
        login: (success, user) => {
            console.log("LOGIN STATE", success, user);
            if (success) {
                this.setState({ currentUser: user, loggedIn: true });
            } else {
                this.setState(this.state);
            }
        },
        logout: () => {
            console.log("LOGGIN OUT");
            this.setState({ currentUser: "", loggedIn: false });
        },
        loadInventory: (inventory) => {
            this.setState({ marketplace_items: inventory });
        },
        loadShownPaintings: (paintings) => {
            console.log("Loading the gallery...");
            this.setState({ gallery: paintings });
            console.log(this.state.gallery);
        },
        addToCart: (item, cost) => {
            if (!this.state.cart[item]) {
                this.setState(state => ({
                    cart: {
                        ...state.cart,
                        [item]: 1,
                        cartCost: state.cart.cartCost + cost
                    },
                }))
            } else {
                this.setState(state => ({
                    cart: {
                        ...state.cart,
                        [item]: state.cart[item] + 1,
                        cartCost: state.cart.cartCost + cost
                    }
                }))
            }
        },
        increaseCartAmt: () => {},
        decreaseCartAmt: () => {},
        removeItem: () => {}
    }

    render() {
        return (
            <Provider value={{
                // values to send down
                loggedIn: this.state.loggedIn,
                currentUser: this.state.currentUser,
                marketplace_items: this.state.marketplace_items,
                cart: this.state.cart,
                gallery: this.state.gallery,
                totalCoins: this.state.totalCoins,
                gameEarnings: this.state.gameEarnings,
                bet: this.state.bet,

                // functions to send down
                login: this.state.login,
                logout: this.state.logout,
                loadInventory: this.state.loadInventory,
                loadShownPaintings: this.state.loadShownPaintings,
                addToCart: this.state.addToCart,
                increaseCartAmt: this.state.increaseCartAmt,
                decreaseCartAmt: this.state.decreaseCartAmt,
                removeItem: this.state.removeItem
            }}>
                {/*lets us see our children components  */}
                {this.props.children}
            </Provider>
        )
    }
}
export { ConfigProvider };

export default Consumer;
