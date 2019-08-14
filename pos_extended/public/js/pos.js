erpnext.pos.PointOfSale = erpnext.pos.PointOfSale.extend({
    make_control: function() {
        this._super();
        this.make_pos_fields();
    },
    make_pos_fields: function() {
        const me = this;
        frappe.call({
            method: "pos_extended.pos_extended.api.get_pos_fields",
            callback: function(r) {
                if (r.message) {
                    me.fields = r.message;
                    _render_fields(me);
                }
            }
        });
    }
});

var _render_fields = function(pos) {
    const header = pos.wrapper.find(".item-cart .pos-bill-header");
    header.empty();

    const fields = pos.fields;
    fields.forEach(field => {
       header.append(`
           <span class="cell">${__(field.label)}</span>
       `);
    });
};
