import createStore from "../state/createStore";
import User, {EMPTY_USER_INFO} from "../auth/User";


export const defaultState = {
    isVisible: false,
    gameName: "",
    tokensToEnter: null,
    spectatorsAllowed: false,
    timeAllowed: null,
    password: ""
};

export interface ICreateGameForm {
    isVisible: boolean,
    gameName: string,
    tokensToEnter: number|null,
    spectatorsAllowed: boolean,
    timeAllowed: number|null,
    password: string
}

export interface ICreateGamesStore {
    wasSubmitted: boolean,
    createGameForm: ICreateGameForm,
    validationMsg: string | null,
    setCreateGameForm: (form: ICreateGameForm) => void,
    reset: () => void,
    submit: () => boolean
}

const validate = (form: ICreateGameForm) => {
    if (User.getUserInfo() == EMPTY_USER_INFO) {
        return "Please log in";
    }

    if (!form.timeAllowed) {
        return "Time allowed is missing";
    }

    if (!Number.isInteger(form.timeAllowed)) {
        return "Time allowed is wrong format";
    }

    if (form.timeAllowed < 1 || form.timeAllowed > 60) {
        return "Time allowed needs to be between 1 minute and 60 minutes";
    }

    if (form.tokensToEnter === null) {
        return "Tokens to enter is wrong format";
    }

    if (!Number.isInteger(form.tokensToEnter)) {
        return "Tokens to enter is wrong format";
    }

    if (form.tokensToEnter < 0 || form.tokensToEnter > 9999) {
        return "Tokens to enter needs to be between 1 and 9999";
    }

    if (typeof form.gameName !== "string") {
        return "Game name is wrong format";
    }

    if (form.gameName.trim().length < 5 || form.gameName.trim().length > 25) {
        return "Game name needs to be between 5 and 25 characters";
    }

    if (typeof form.password !== "string") {
        return "Password is wrong format";
    }

    if (form.password.trim().length < 0 || form.password.trim().length > 50) {
        return "Password needs to be between 0 and 50 characters";
    }

    return null;
};

const CreateGamesStore: ICreateGamesStore = createStore({
    createGameForm: defaultState,
    submit: () => {
        CreateGamesStore.wasSubmitted = true;
        const msg = validate(CreateGamesStore.createGameForm);
        CreateGamesStore.validationMsg = msg;
        return !msg;
    },
    setCreateGameForm: (form: ICreateGameForm) => {
        CreateGamesStore.createGameForm = form;
        CreateGamesStore.validationMsg = CreateGamesStore.wasSubmitted ? validate(form): null;
    },
    reset: () => {
        CreateGamesStore.setCreateGameForm({
            ...defaultState
        });
        CreateGamesStore.wasSubmitted = false;
        CreateGamesStore.validationMsg = null;
    }
});

export default CreateGamesStore;