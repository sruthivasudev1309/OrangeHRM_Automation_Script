"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const BasePage_1 = require("../core/BasePage");
class LoginPage extends BasePage_1.BasePage {
    async enterUsername(username) {
        await this.fillByPlaceholder('Username', username);
    }
    async enterPassword(password) {
        await this.fillByPlaceholder('Password', password);
    }
    async clickLogin() {
        await this.clickButton('Login');
    }
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
        await this.waitForNetworkIdle();
    }
}
exports.LoginPage = LoginPage;
