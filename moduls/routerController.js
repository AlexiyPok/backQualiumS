const fs = require('fs');
const path = require('path');
const dbFileName = './../db/db_JSON.json';
let dbUsers = require(dbFileName);

class routerController {

    async getUsers(request, response) {
        try {
            if (dbUsers.length == 0) response.status(200).json({message: `В базе данных нет ни одного пользователя`});
            else response.status(200).json(dbUsers);
        }
        catch (e) {
            response.status(400).json({message: `getUsers error`});
        }
    }

    async registration(request, response) {
        try {
            const user = await dbUsers.find(user => (user.username === request.body.username));
            if (user) {
                return response.status(200).json({message: "Такой пользователь уже существует"})
            }
            else {
                let newUser = {
                    id: Date.now(),
                    username: request.body.username,
                    email: request.body.email,
                    password: request.body.password,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName
                };

                dbUsers.push(newUser);
                await writeDb(dbUsers);

                return response.status(200).json({message: "Пользователь успешно зарегистрирован"})
            }
        }
        catch (e) {
            response.status(400).json({message: `registration error`});
        }
    }

    async authorization(request, response) {
        try {
            const user = await dbUsers.find(user => (user.username === request.body.username));
            if (!user) response.status(200).json({message: `Такого пользователя не существует (\'${request.body.username}\')`});
            else if (user.password === request.body.password) response.status(200).json({message: `Вы вошли как пользователь \'${user.username}\'`});
            else response.status(200).json({message: `Введен неверный пароль пользователя \'${user.username}\'`});
        }
        catch (e) {
            response.status(400).json({message: `authorization error`});
        }
    }

    async changeProfile(request, response) {
        try {
            const user = await dbUsers.find(user => (user.id === Number(request.params.id)));
            if (!user) {
                response.status(200).json({message: `Такого пользователя не существует (ID=${request.params.id})`});
            }
            else {
                user.email = request.body.email;
                user.firstName = request.body.firstName;
                user.lastName = request.body.lastName;

                await writeDb(dbUsers);

                response.status(200).json({
                    message: `Данные пользователя успешно изменены`,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            }
        }
        catch (e) {
            response.status(400).json({message: `changeProfile error`});
        }
    }

    async deleteProfile(request, response) {
        try {
            const user = await dbUsers.find(user => (user.id === Number(request.params.id)));
            if (!user) {
                response.status(200).json({message: `Такого пользователя не существует (ID=${request.params.id})`});
            }
            else {
                dbUsers = dbUsers.filter(user => (user.id !== Number(request.params.id)));

                await writeDb(dbUsers);

                response.status(200).json({message: `Профиль пользователя \'${user.username}\' успешно удалён`});
            }
        }
        catch (e) {
            response.status(400).json({message: `deleteProfile error`});
        }
    }

    async reviewProfile(request, response) {
        try {
            const user = await dbUsers.find(user => (user.id === Number(request.params.id)));
            if (!user) response.status(200).json({message: `Такого пользователя не существует (ID=${request.params.id})`});
            else response.status(200).json(user);
        }
        catch (e) {
            response.status(400).json({message: `getUser error`});
        }
    }

    async postAvatar(request, response) {
        try {
            response.json("postAvatar");
        }
        catch (e) {
            response.status(400).json({message: `post Avatar`});
        }
    }

    async getAvatar(request, response) {
        try {
            response.json("getAvatar");
        }
        catch (e) {
            response.status(400).json({message: `get Avatar`});
        }
    }

    async page404(request, response) {
        try {
            response.json("page404");
        }
        catch (e) {
            response.status(400).json({message: `error 404`});
        }
    }
}

function writeDb(data) {
    fs.writeFile(`./db/${dbFileName}`, JSON.stringify(data, null, 2), (err) => {
        if (err) console.log("Error")
    });
}

function getContentType(url) {
    switch (path.extname(url)) {
        case ".html":
            return"text/html";
        case ".css":
            return"text/css";
        case ".js":
            return"text/javascript";
        case ".json":
            return"application/json";
    }
}

module.exports = new routerController();