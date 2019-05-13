import { Observable, EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page/page';
import { screen } from 'tns-core-modules/platform/platform'
import * as frame from 'tns-core-modules/ui/frame/frame';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from 'tns-core-modules/application/application';


export class TabviewViewModel extends Observable {
    private static previousMenu: StackLayout;
    menu;
    screenWidth;
    page: Page

    constructor(page: Page) {
        super();
        // this.menuPos()
        this.page = page
        this.screenWidth = - screen.mainScreen.widthDIPs
       
    }

    public onOpenDrawerTap() {
        let sideDrawer: RadSideDrawer = <RadSideDrawer>getRootView().getViewById("sideDrawer");
        sideDrawer.showDrawer();
    }

    public onCloseDrawerTap() {
        let sideDrawer: RadSideDrawer = <RadSideDrawer>getRootView().getViewById("sideDrawer");
        sideDrawer.closeDrawer();
     

        
    }


    navigate(ev: EventData) {

        let tappedMenu = <StackLayout>ev.object;
        let view = frame.topmost().getViewById('frame')

        // prevent consecutive navigation to the same page
        if (tappedMenu == TabviewViewModel.previousMenu) {
            return;
        } else {
            TabviewViewModel.previousMenu = tappedMenu;
        }

        console.log(`views/${tappedMenu.id}/${tappedMenu.id}-page`)
        view.set("defaultPage", `views/${tappedMenu.id}/${tappedMenu.id}-page`);
    //    frame.topmost().navigate({moduleName:`views/${tappedMenu.id}/${tappedMenu.id}-page`})
    this.onCloseDrawerTap()
    }



}
