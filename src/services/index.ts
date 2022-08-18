import { APISchema } from "./http-common";

const Load__Data = async (param: any) => {
    try {
        let content: any = APISchema(param);

        let request: any = await fetch(
            process.env.REACT_APP_BACKENDURL + "/api/load",
            content
        );

        if (request.status === 200) {
            var result = await request.json();
            return result.data;
        } else {
            return null;
        }
    } catch (err: any) {
        console.log(err.message);
        return null;
    }
};

// Todo Manage
const Create__Todo = async (param: any) => {
    try {
        let content: any = APISchema({ name: param });

        let request: any = await fetch(
            process.env.REACT_APP_BACKENDURL + "/api/create-todo",
            content
        );
        if (request.status === 200) {
            return {
                success: true,
            };
        } else {
            let message = await request.text();
            return {
                success: false,
                message: message,
            };
        }
    } catch (err: any) {
        console.log(err.message);
        return {
            success: false,
            message: "Community error",
        };
    }
};

const Remove__Todo = async (param: any) => {
    try {
        let content: any = APISchema({ name: param });

        let request: any = await fetch(
            process.env.REACT_APP_BACKENDURL + "/api/remove-todo",
            content
        );

        if (request.status === 200) {
            return {
                success: true,
            };
        } else {
            return {
                success: false,
                message: request.message,
            };
        }
    } catch (err: any) {
        console.log(err.message);
        return {
            success: false,
            message: "Community error",
        };
    }
};

// Task Manage
const Create__Task = async (param: any) => {
    try {
        let content: any = APISchema(param);

        let request: any = await fetch(
            process.env.REACT_APP_BACKENDURL + "/api/create-task",
            content
        );

        if (request.status === 200) {
            return {
                success: true,
            };
        } else {
            let message = await request.text();
            return {
                success: false,
                message: message,
            };
        }
    } catch (err: any) {
        console.log(err.message);
        return {
            success: false,
            message: "Community Error",
        };
    }
};

const Update__Task = async (param: any) => {
    try {
        let content: any = APISchema(param);

        let request: any = await fetch(
            process.env.REACT_APP_BACKENDURL + "/api/update-task",
            content
        );

        if (request.status === 200) {
            return {
                success: true,
            };
        } else {
            let message = await request.text();
            return {
                success: false,
                message: message,
            };
        }
    } catch (err: any) {
        console.log(err.message);
        return {
            success: false,
            message: "Community Error",
        };
    }
};

const Remove__Task = async (param: any) => {
    try {
        let content: any = APISchema(param);

        let request: any = await fetch(
            process.env.REACT_APP_BACKENDURL + "/api/remove-task",
            content
        );

        if (request.status === 200) {
            return {
                success: true,
            };
        } else {
            let message = await request.text();
            return {
                success: false,
                message: message,
            };
        }
    } catch (err: any) {
        console.log(err.message);
        return {
            success: false,
            message: "Community Error",
        };
    }
};

const Complete_Task = async (param: any) => {
    try {
        let content: any = APISchema(param);

        let request: any = await fetch(
            process.env.REACT_APP_BACKENDURL + "/api/complete-task",
            content
        );

        if (request.status === 200) {
            return {
                success: true,
            };
        } else {
            let message = await request.text();
            return {
                success: false,
                message: message,
            };
        }
    } catch (err: any) {
        console.log(err.message);
        return {
            success: false,
            message: "Community Error",
        };
    }
};

// Export Functions
const Action = {
    Create__Todo,
    Remove__Todo,
    Create__Task,
    Update__Task,
    Remove__Task,
    Load__Data,
    Complete_Task,
};

export default Action;
