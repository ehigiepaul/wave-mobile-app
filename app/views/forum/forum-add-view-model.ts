import { Observable, EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page/page';
import { confirm, alert } from 'tns-core-modules/ui/dialogs/dialogs';
import { topmost } from 'tns-core-modules/ui/frame/frame';
import { request } from 'tns-core-modules/http/http';
import { api, localStorage } from '~/shared/env';
import moment from "moment"
export class ForumAddViewModel extends Observable {
    title;
    content
    constructor() {
        super();
    }


    submit(ev: EventData) {
        var submit = <Page>ev.object
        if ((this.title || this.content) == undefined) {
            alert('Empty field found.\nPlease fill in the fields')
        } else {
            confirm("Are you sure this is what you want to create").then(async val => {
                // console.log(val)
                if (val) {
                    // push to the db
                    request({
                        url: `${api.client.url}/me/forums`,
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": localStorage.getString("token")
                        },
                        content: JSON.stringify({
                            topic: this.title,
                            content: this.content,
                            date: moment().format('Do MMMM YYYY'),
                            views: 0
                        })
                    }).then(d => {

                        topmost().goBack()
                    })

                }
            })
        }
    }

    dateTo(val) {
        return moment(val).format("DD-MM-Y")

    }
    goBack() {
        topmost().goBack()
    }
}
