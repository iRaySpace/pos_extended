erpnext.pos.PointOfSale = erpnext.pos.PointOfSale.extend({
    make_control: function() {
        this._super();
        this.make_pos_fields();
    },
    show_items_in_item_cart: function() {
        const me = this;
        const $items = this.wrapper.find(".items").empty();
        const $no_items_message = this.wrapper.find(".no-items-message");
        $no_items_message.toggle(this.frm.doc.items.length === 0);

        $.each(this.frm.doc.items || [], function (i, item) {
            _render_pos_item($items, me, item);
        });

        this.wrapper.find("input.pos-item-qty").on("focus", function() {
            $(this).select();
        });

        this.wrapper.find("input.pos-item-disc").on("focus", function() {
           $(this).select();
        });

        this.wrapper.find("input.pos-item-price").on("focus", function() {
           $(this).select();
        });
    },
    make_pos_fields: function() {
        const me = this;
        frappe.call({
            method: "pos_extended.pos_extended.api.get_pos_fields",
            callback: function(r) {
                if (r.message) {
                    me.fields = r.message;
                    _render_header_fields(me);
                }
            }
        });
    }
});


var _render_pos_item = function($items, pos, item) {
//    pos-list-row pos-bill-item data-item-code=['item_code']
    // cell
    $items.append(`
        <div class="pos-list-row pos-bill-item" data-item-code="${item.item_code}">
            ${get_pos_item_fields(item)}
        </div>
    `);

    function get_pos_item_fields(item) {
        const pos_item_fields = pos.fields.map(
            field => _get_pos_item_field(item, field)
        )
        return pos_item_fields.join("\n");
    }
};


var _get_pos_item_field = function(item, column) {
    let value = item[column.field];

    if (column.type === "Currency") {
        value = format_currency(value);
    }

    return `
        <div class="cell">${value}</div>
    `;
};


var _render_header_fields = function(pos) {
    const header = pos.wrapper.find(".item-cart .pos-bill-header");
    header.empty();

    const fields = pos.fields;
    fields.forEach(field => {
       header.append(`
           <span class="cell">${__(field.label)}</span>
       `);
    });
};
