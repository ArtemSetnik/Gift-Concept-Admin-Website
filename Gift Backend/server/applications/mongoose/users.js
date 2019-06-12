/**
 * 'Schema' field is MongoDB document Schema definition
 * 'options' field is option definition of this Schema
 * 'callback' field works like hooks and it contains pre(before), post(after) and any other step
 * 'documentName' field is name of this Schema
 * @author Shadow
 */

var { ObjectId } = require('mongoose').Schema.Types;

const Role_Types = ["super", "admin", "developer", "seller", "driver", "buyer"];
const User_Activation_Types = ["allow", "pending", "disallow"]
const Expire_Cycles = [-1, 5, 10, 60, 120];

module.exports = {
    Schema: {
        username: { type: String, default: '' },
        email: { type: String, index: { unique: true, dropDups: true }, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, default: 'buyer', enum: Role_Types },
        avatar: { type: String, default: 'default' },
        address: { type: String, default: '' },
        credential: { type: String, default: null },
        loginTime: { type: Number, require: true },
        expireCycle: { type: Number, default: 30, enum: Expire_Cycles },
        loginStatus: { type: Boolean, default: false },
        activated: { type: String, default: 'pending', enum: User_Activation_Types }
    },
    options: {
        timestamps: true,
        strict: true,
        autoIndex: false
        // toJSON: {
        //     virtuals: true
        // },
        // toObject: {
        //     virtuals: true
        // }
    },
    callback(schema) {
        schema.pre('find', function (next) {
            this.email = this.email.toLocaleLowerCase();
            next();
        })
        schema.pre('findOne', function (next) {
            if (this._conditions.email) {
                this._conditions.email = this._conditions.email.toLocaleLowerCase();
            }
            next();
        })
        // schema.virtual('col2', {
        //     ref: 'collection2',
        //     localField: 'col2Id',
        //     foreignField: '_id',
        //     // justOne: false
        // })
        // schema.pre('find', function() {
        //     this.populate({
        //         path: 'monitor_post_id',
        //         match: {
        //             'monitor_post_name': /라진/
        //         }
        //     })
        // })
        // schema.post('find', function(result) {
        //     return this.find({monitor_post_id:null});
        // })
    },
    async initialized(model) {
        // console.log("=============00000000000");
        // console.log( model.listIndexes(), "sdsdfsf")
        // console.log("=============");
        // await model.init();
        // await model.createIndexes();
    },
    documentName: 'users'
}