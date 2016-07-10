<template>
    <div>
        <select v-model="year" v-on:change="onYearChanged">
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
        </select>
        <select v-model="month" v-on:change="onMonthChanged">
            <option v-for="n in 12" value={{n+1}}>{{n+1}}</option>
        </select>
        <div class="mod mod-daily">
            <div 
                v-for="n in allDay" v-on:click="onSelectDaily(n+1)"
                v-bind:class="n+1==day ? classA : classB"
            >{{n+1}}</div>
        </div>
        <div class="clear"></div>
        <div class="mod mod-content">
            {{{dailyContent}}}
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function(){
            return {
                year: (new Date()).getFullYear(),
                month: (new Date()).getMonth() + 1,
                day: (new Date()).getDate(),
                dailyContent: '请选择日期',
                classA: ['unit', 'unit-daily', 'unit-daily-active'],
                classB: ['unit', 'unit-daily']
            }
        },
        computed: {
            allDay: function(){
                let month = parseInt(this.month),
                    year = parseInt(this.year);

                if (month === 2){
                    if (year % 4 === 0 || year % 400 == 0){
                        return 29;
                    } else {
                        return 28
                    }
                }
                if ([1,3,5,7,8,10,12].indexOf(month)!=-1){
                    return 31;
                }

                return 30;
            }
        },
        methods: {
            onMonthChanged: ()=>{

            },
            onYearChanged: ()=>{

            },
            onSelectDaily: function(day){
                this.$set('day', day);
                let year = this.year,
                    month = this.month < 10 ? '0' + this.month : this.month;

                day = day < 10 ? '0' + day : day;

                fetch(`daily/full?time=${year}-${month}-${day}`)
                .then(response=>{
                    if (response.status === 500){
                        return '没有写日志';
                    }
                    return response.text();
                })
                .then(data=>{
                    this.$set('dailyContent', data);
                });
            }
        }
    }
</script>






