erpnext.pos.PointOfSale = erpnext.pos.PointOfSale.extend({
    make_control: function() {
        this._super();
        this.make_pos_fields();
    },
    add_to_cart: function() {
        const me = this;

        this.customer_validate();
        this.validate_serial_no();
        this.validate_warehouse();

        const { has_batch_no } = this.items[0];

        let validate = function() {
            validate_item();
        };

        if (has_batch_no) {
            validate = () => {
                me.mandatory_batch_no(validate_item);
            };
        }

        validate();

        function validate_item() {
            const item = me.check_item_exists();
            if (!item) {
                me.add_new_item_to_grid();
            } else {
                item.qty = item.qty + 1;
                item.amount = flt(item.rate) * flt(item.qty);
            }
            me.update_paid_amount_status(false);
            me.wrapper.find(".item-cart-items").scrollTop(1000);
        }
    },
    check_item_exists: function() {
        return this.frm.doc.items.find(
            ({ item_code, batch_no }) =>
                item_code === this.items[0].item_code
                && batch_no === this.items[0].batch_no
        );
    },
    mandatory_batch_no: function(callback) {
        const me = this;
        if (this.items[0].has_batch_no && !this.item_batch_no[this.items[0].item_code]) {
            frappe.prompt([{
                'fieldname': 'batch',
                'fieldtype': 'Select',
                'label': __('Batch No'),
                'reqd': 1,
                'options': this.batch_no_data[this.items[0].item_code]
            }],
            function(values) {
                me.items[0].batch_no = values.batch;
                me.item_batch_no[me.items[0].item_code] = values.batch;
                callback();
            },
            __('Select Batch No'));
        }
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
