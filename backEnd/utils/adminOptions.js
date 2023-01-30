const bycrypt = require("bcryptjs");

const { Store } = require("../model/Store");
const { Role } = require("../model/Role");
const { User } = require("../model/User");
const { Client, ClientStore } = require("../model/Client");
const { Product } = require("../model/Product");
const { Category } = require("../model/Category");
const { Seles, SaleItem } = require("../model/Sales");

const generateResource = (model, properties, actions) => {
    return  {
        resource: model,
        options: {
            properties: {
                ...properties,
            },
        actions: actions
        }
    }
};

const cleanCpfCnpj = (cpfCnpj) => {
    return cpfCnpj.replace(/[^\d]+/g,'');
}

const generateAdminOptions = () => {
    return {
        resources: [
            generateResource(Store, {}, {
                new: {
                    before: async (request) => {
                        request.payload.cnpj = cleanCpfCnpj(request.payload.cnpj);
                        return request;
                    }
                },
                edit: {
                    before: async (request) => {
                        if(request.payload.cnpj) {
                            request.payload.cnpj = cleanCpfCnpj(request.payload.cnpj);
                        }
                        return request;
                    },
                },
                }),
            generateResource(Role),
            generateResource(User, 
                {
                    encryptedPassword: {
                        isVisible: {
                            list: false, edit: false, create: false, show: false
                        },
                    },
                    password: {
                        type: 'password',
                        isVisible: {
                            list: false, edit: true, create: true, show: false
                        },
                        isRequired: true
                    },
                }, {
                    new: {
                        before: async (request) => {                    
                            if(request.payload.password) {
                                request.payload.encryptedPassword = await bycrypt.hash(request.payload.password, 10);
                            }
                            return request;
                        }
                    },
                    edit: {
                        before: async (request) => {
                            if(request.payload.password) {
                                request.payload.encryptedPassword = await bycrypt.hash(request.payload.password, 10);
                            }
                            return request;
                        }
                    }
                }),
                generateResource(Client, {}, {
                    new: {
                        before: async (request) => {
                            request.payload.cnpj = cleanCpfCnpj(request.payload.cnpj);
                            return request;
                        }
                    },
                    edit: {
                        before: async (request) => {
                            if(request.payload.cnpj) {
                                request.payload.cnpj = cleanCpfCnpj(request.payload.cnpj);
                            }
                            return request;
                        },
                    },
                }),
            generateResource(ClientStore),
            generateResource(Category),
            generateResource(Product),
            generateResource(Seles),
            generateResource(SaleItem),
        ],
    }
};

module.exports = { generateAdminOptions };