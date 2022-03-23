var exports = module.exports = {};

exports.createEventKeyboard = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['📋 Quiz','📈 Exam'],
            ['💻 Assignment','🌞 Meeting'],
            ['Cancel']
        ],
        one_time_keyboard: true,
    }),
    // parse_mode: 'html',
    // disable_web_page_preview: true
}
exports.settingsKeyboard = {
    reply_markup: JSON.stringify({
        keyboard: [['🔙 menu'], ['🖥 Transmission info'], ['🔔 User notification'], ['📂 Set download folder']]
    }),
    // parse_mode: 'html'
}
exports.upcomingKeyboards ={
    reply_markup: JSON.stringify({
        keyboard: [
            ['Upcoming Quizzes','Upcoming Exams'], ['Upcoming Assignments','Upcoming Meetings'],
            ['All upcoming','Cancel']
        ]
    }),
}
exports.editEventKeyboard = {
    reply_markup: JSON.stringify({
        keyboard: [
             ['Edit Quiz','Edit Exam'], ['Edit Assignment','Edit Meeting'],
             ['Cancel']
        ]
    })
}
exports.deleteEventKeyboard = {
    reply_markup: JSON.stringify({
        keyboard: [
             ['Delete Quiz','Delete Exam'], ['Delete Assignment','Delete Meeting'],
             ['Cancel']
        ]
    })
}
exports.cancelKeyboard = {
     reply_markup: JSON.stringify({
        keyboard: [
             ['Cancel']
        ],resize_keyboard:true,
    })

}