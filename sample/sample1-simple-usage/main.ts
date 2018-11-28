import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {Component, NgModule} from "@angular/core";
import {PopoverModule} from "../../src/index";
import {BrowserModule} from "@angular/platform-browser";
import { Popover } from 'ngx-popover';

@Component({
    selector: "app",
    template: `
<div class="container">

    <!-- regular popover -->
    <p>
        It is a long established <span popover="Hello fact!" popoverTitle="Fact #1"><b>click this fact</b></span> that a reader will be distracted by the readable content of a page when looking at its layout. 
        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
        <span popover="many, but not all" popoverPlacement="left"><b>Many desktop</b></span> publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
        <span popover="various, but not all" popoverPlacement="right"><b>Various versions</b></span> have evolved over the years, sometimes by accident, <span popover="another hint" popoverPlacement="top"><b>sometimes on purpose</b></span> (injected humour and the like)
    </p>
    
    <br/>
    <button popover="Hello popover. Now click outside." [popoverCloseOnClickOutside]="true">
        click to open popover that will be closed when you click outside of it.
    </button>

    <!-- popover with dynamic html content -->
    <br/><br/>
    <div>
        <popover-content #myPopover 
            title="this header can be omitted"
            placement="right"
            [closeOnClickOutside]="true">
            <b>Very</b> <span style="color: #C21F39">Dynamic</span> <span style="color: #00b3ee">Reusable</span> 
            <b><i><span style="color: #ffc520">Popover With</span></i></b> <small>Html support</small>.
            Click outside of this popover and it will be dismissed automatically.
            <u (click)="myPopover.hide()">Or click here to close it</u>.
        </popover-content>
        
        <button [popover]="myPopover" (onShown)="popoverShown($event)" (onHidden)="popoverHidden($event)">click this button to see a popover</button>
    </div>

    <!-- popover show on hover -->
    <br/>
    <div>
        <button popover="Hello popover" [popoverOnHover]="true">hover this button to see a popover</button>
    </div>

    <!-- popover show on hover and hide only when mouse over outside of the popover -->
    <br/>
    <div>
        <button popover="Hello popover"
                popoverPlacement="right"
                [popoverOnHover]="true" 
                [popoverCloseOnMouseOutside]="true">
            hover this button to see a popover, allows to create interactive popovers
        </button>
    </div>
    
    <!-- popover show on hover -->
    <br/>
    <div>
        <button popover="Hello dismissible popover" 
                [popoverDismissTimeout]="2000">click to see this popover. This popover will be dismissed in two seconds</button>
    </div>
    
    <br/>
    <div>
        <button popover="By default, this popover will be shown to the left if enough space, otherwise, to the right." popoverPlacement="auto left">
            click this button to see a popover using auto placement
        </button>
    </div>
</div>
`
})
export class Sample1App {

    constructor() {}

    popoverShown(popover: Popover) {
        console.log('Popover shown:', popover);
    }
    
    popoverHidden(popover: Popover) {
        console.log('Popover hidden:', popover);
    }

}

@NgModule({
    imports: [
        BrowserModule,
        PopoverModule
    ],
    declarations: [
        Sample1App
    ],
    bootstrap: [
        Sample1App
    ]
})
export class Sample1Module {

}

platformBrowserDynamic().bootstrapModule(Sample1Module);