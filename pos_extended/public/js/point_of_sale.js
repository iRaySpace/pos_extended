class POSExtendedCart extends POSCart {
    constructor({ frm, wrapper, events }) {
        super({ frm, wrapper, events });
        this.fields = [];
    }

    make_dom() {
        super.make_dom();
        this.make_fields();
    }

    get_item_html(item) {
        const me = this;

        // ERPNext
        const is_stock_item = this.get_item_details(item.item_code).is_stock_item;
        const indicator_class = (!is_stock_item || item.actual_qty >= item.qty) ? 'green': 'red';
        const batch_no = item.batch_no || '';

        return `
            <div class="list-item indicator ${indicator_class}" data-item-code="${escape(item.item_code)}"
                data-batch-no="${batch_no}" title="Item: ${item.item_name}  Available Qty: ${item.actual_qty}">
                ${get_item_fields_html(item)}
            </div>
        `;

        function get_item_fields_html(item) {
            const fields = me.fields.map(function(column) {
                return me.get_cart_field(item, column);
            });
            return fields.join("\n");
        }
    }

    get_cart_field(item, column) {
        const className = column.label.split(' ').join('_').toLowerCase();
        let value = item[column.field];

        if (column.type === "Qty") {
            value = _get_quantity_html(value);
        } else if (column.type === "Currency") {
            value = format_currency(value, this.frm.doc.currency);
        } else if (column.type === "Discount") {
            value = `${value}%`;
        }

        return `
            <div class="${className} list-item__content text-right">
                ${value}
            </div>
        `;
    }

    make_fields() {
        const me = this;
        frappe.call({
            method: 'pos_extended.pos_extended.api.get_pos_fields',
            callback: function(r) {
                if (r.message) {
                    me.fields = r.message;
                    _render_fields(me);
                }
            }
        });
    }
}


var _render_fields = function(cart) {
    const fields = cart.fields;
    cart.wrapper.find('.list-item--head').empty();
    for(let i = 0; i < fields.length; i++) {
        cart.wrapper.find('.list-item--head').append(`
            <div class="list-item__content text-muted text-right">
                ${__(fields[i].label)}
            </div>
        `);
    }
};

var _get_quantity_html = function(value) {
    return `
        <div class="input-group input-group-xs">
            <span class="input-group-btn">
                <button class="btn btn-default btn-xs" data-action="increment">+</button>
            </span>
            <input class="form-control" type="number" value="${value}">
            <span class="input-group-btn">
                <button class="btn btn-default btn-xs" data-action="decrement">-</button>
            </span>
        </div>
    `;
};


POSCart = POSExtendedCart;