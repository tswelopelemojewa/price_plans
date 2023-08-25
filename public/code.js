document.addEventListener('alpine:init', () => {
    Alpine.data('PhoneBill', () => {
        return {
            plan_name: '',
            sms_price: '',
            call_price: '',

            plans: '',

            ed_id: '',
            hide: false,
            hideForever: false,


            user_call_price: '',
            user_sms_price: '',
            user_plan_name: '',

            selectedName: '',
            actions: '',
            total: '',

            hidePlan: 'false',
            action_entered: '',

            plan: '',
            plan_name_bll: '',
            

            init() {
                this.getPlan();
            },

            getPlan() {
                axios.get('/api/price_plans/')
                    .then((res) => {
                        this.plans = res.data.price_plans;
                        console.log(res.data);
                    })
            },

            ccPlan() {
                
                axios.post('/api/price_plan/create', {
                    plan_name: this.plan_name,
                    sms_price: this.sms_price,
                    call_price: this.call_price
                })
                .then(() => {
                    this.getPlan();
                    setTimeout(() => {
                        this.call_price = '';
                        this.sms_price = '';
                        this.plan_name = '';
                    }, 30);
                })
           
                
            },
            deletePlan(id) {
                axios.post('/api/price_plan/delete', {
                    id: id
                })
                    .then((res) => {
                        console.log(res.data)

                        this.getPlan();

                    })
            },
            updatePlan(plan_name, sms_price, call_price, ed_id) {
                axios.post('/api/price_plan/update', {
                    plan_name: this.plan_name,
                    sms_price: this.sms_price,
                    call_price: this.call_price,
                    id: this.ed_id
                })
                    .then((res) => {
                        console.log(res.data)

                        this.getPlan();

                        setTimeout(() => {
                            this.user_call_price = '';
                            this.user_sms_price = '';
                            this.user_plan_name = '';
                            this.call_price = '';
                            this.sms_price = '';
                            this.plan_name = '';
                        }, 30);
                    })
            },
            phoneBill() {
                axios
                    .post('api/price_plan/phonebill', {
                        actions: this.actions,
                        plan_name: this.selectedName
                        
                    })
                    .then((result) => {
                        this.total = result.data.total;
                    })
            }




        }

    })
})