export const validation_message = {
    "name" : [
        {
            type : 'required' , message :'* Name fild required'
        }
    ],
    "email" : [
        {
            type : 'required' , message :'* Email fild required'
        },
        {
            type : "pattern" , message :'* Valid Email required'
        }
    ],"feedback" : [
        {
            type : 'required' , message :'* Feedback fild required'
        }
    ],
"captua" : [
    {
        type : 'required' , message :'* captcha fild required'
    }
]
}