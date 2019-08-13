class POSExtendedCart extends POSCart {
    make_dom() {
        super.make_dom();
        this.make_fields();
    }

    make_fields() {
        const me = this;
        frappe.call({
            method: 'pos_extended.pos_extended.api.get_pos_fields',
            callback: function(r) {
                if (r.message) {
                    const fields = r.message;
                    _render_fields(me, fields);
                }
            }
        });
    }
}


var _render_fields = function(cart, fields) {
    for(let i = 0; i < fields.length; i++) {
        cart.wrapper.find('.list-item--head').append(`
            <div class="list-item__content text-muted text-right">
                ${__(fields[i].label)}
            </div>
        `);
    }
};


POSCart = POSExtendedCart;