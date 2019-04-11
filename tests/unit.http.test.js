const test = require(`ava`);
const sinon = require(`sinon`);
const config = require('../config.json');

const reply = require(`..`).reply;

test(`reply: should send a text to a list of drivers`, t => {
    const req = {
        body: {
            rides: {
                "drivers" :[
                    { "name": "bkoo", "location": "Busch" },
                    { "name": "jerell", "location": "C/D" },
                    // { "name": "Matt", "location": "College" }
                ],
                "time": "12:40pm"
            }
        },
    };
    const listOfDrivers = [
        {
            "name": ["brian", "bkoo", "briankoo", "brian koo"],
            "phoneNumber": config.KOO_NUMBER
        },
        {
            "name": ["jerell", "jreezy", "jerellmendoza" ],
            "phoneNumber": config.J_NUMBER
        }
    ]

    const shouldBeData = [
        `Hey ${req.body.rides.drivers[0].name}! This is a reminder to give rides at ${req.body.rides.drivers[0].location}. Please be there by ${req.body.rides.time}.
     Send me a text when you leave and text me the time when you arrive. Thank you to ${listOfDrivers[0].phoneNumber}`,
        `Hey ${req.body.rides.drivers[1].name}! This is a reminder to give rides at ${req.body.rides.drivers[1].location}. Please be there by ${req.body.rides.time}.
     Send me a text when you leave and text me the time when you arrive. Thank you to ${listOfDrivers[1].phoneNumber}`,
        'Messages sent to 8183592010'
    ];

    const res = {status: sinon.stub(), end: sinon.stub()};

    reply(req, res);

    t.true(res.end.calledOnce);
    t.deepEqual(...res.end.firstCall.args, shouldBeData);
});



