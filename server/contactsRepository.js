/**
 * Created by GodaiYuusaku on 3/30/17.
 */
let myContacts = [
    {firstName: 'Joseph', lastName: 'Gatto', contactKey: 'a1'},
    {firstName: 'Salvatore', lastName: 'Volcano', contactKey: 'b1'},
    {firstName: 'Brian', lastName: 'Quinn', contactKey: 'c1'},
    {firstName: 'James', lastName: 'Murray', contactKey: 'd1'},
    {firstName: 'Larry', lastName: 'Santiago', contactKey: 'e1'},
];

exports.sendContacts = function () {
    return myContacts;
};
//
// var module;
// module.exports = {};
// var module;
// module.exports({
//
// });
