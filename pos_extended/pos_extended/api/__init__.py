import frappe


@frappe.whitelist()
def get_pos_fields():
    return frappe.get_all(
        'POS Extended Settings Field',
        fields=['field', 'label', 'type'],
        order_by='idx ASC'
    )
