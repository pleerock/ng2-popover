import {
    Directive,
    HostListener,
    ComponentRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentFactory,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter
} from "@angular/core";
import {PopoverContent} from "./PopoverContent";

@Directive({
    selector: "[popover]",
    exportAs: "popover"
})
export class Popover implements OnChanges {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    protected PopoverComponent = PopoverContent;
    protected popover: ComponentRef<PopoverContent>;
    protected visible: boolean;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(protected viewContainerRef: ViewContainerRef,
                protected resolver: ComponentFactoryResolver) {
    }

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input("popover")
    public content: string | PopoverContent;

    @Input()
    public popoverDisabled: boolean;

    @Input()
    public popoverAnimation: boolean;

    @Input()
    public popoverPlacement:
        "top"
        | "bottom"
        | "left"
        | "right"
        | "auto"
        | "auto top"
        | "auto bottom"
        | "auto left"
        | "auto right";

    @Input()
    public popoverTitle: string;

    @Input()
    public popoverOnHover: boolean = false;

    @Input()
    public popoverCloseOnClickOutside: boolean;

    @Input()
    public popoverCloseOnMouseOutside: boolean;

    @Input()
    public popoverDismissTimeout: number = 0;

    @Output()
    public onShown = new EventEmitter<Popover>();

    @Output()
    public onHidden = new EventEmitter<Popover>();

    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------

    @HostListener("click")
    public showOrHideOnClick(): void {
        if (this.popoverOnHover) return;
        if (this.popoverDisabled) return;
        this.toggle();
    }

    @HostListener("focusin")
    @HostListener("mouseenter")
    public showOnHover(): void {
        if (!this.popoverOnHover) return;
        if (this.popoverDisabled) return;
        this.show();
    }

    @HostListener("focusout")
    @HostListener("mouseleave")
    public hideOnHover(): void {
        if (this.popoverCloseOnMouseOutside) return; // don't do anything since not we control this
        if (!this.popoverOnHover) return;
        if (this.popoverDisabled) return;
        this.hide();
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["popoverDisabled"]) {
            if (changes["popoverDisabled"].currentValue) {
                this.hide();
            }
        }
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    public toggle() {
        if (!this.visible) {
            this.show();
        } else {
            this.hide();
        }
    }

    public show() {
        if (this.visible) return;

        this.visible = true;
        if (typeof this.content === "string") {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible)
                return;

            this.popover = this.viewContainerRef.createComponent(factory);
            const popover = this.popover.instance as PopoverContent;
            popover.popover = this;
            popover.content = this.content as string;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;

            popover.onCloseFromOutside.subscribe(() => this.hide());
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
        } else {
            const popover = this.content as PopoverContent;
            popover.popover = this;
            if (this.popoverPlacement !== undefined)
                popover.placement = this.popoverPlacement;
            if (this.popoverAnimation !== undefined)
                popover.animation = this.popoverAnimation;
            if (this.popoverTitle !== undefined)
                popover.title = this.popoverTitle;
            if (this.popoverCloseOnClickOutside !== undefined)
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            if (this.popoverCloseOnMouseOutside !== undefined)
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;

            popover.onCloseFromOutside.subscribe(() => this.hide());
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0)
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            popover.show();
        }

        this.onShown.emit(this);
    }

    public hide() {
        if (!this.visible) return;

        this.visible = false;
        if (this.popover)
            this.popover.destroy();

        if (this.content instanceof PopoverContent)
            (this.content as PopoverContent).hideFromPopover();

        this.onHidden.emit(this);
    }

    public getElement() {
        return this.viewContainerRef.element.nativeElement;
    }

}
