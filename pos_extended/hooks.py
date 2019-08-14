# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "pos_extended"
app_title = "Pos Extended"
app_publisher = "Ivan Ray Altomera"
app_description = "ERPNext POS with a thrill!"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "irayspacii@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/pos_extended/css/pos_extended.css"
# app_include_js = "/assets/js/pos_extended.min.js"

# include js, css files in header of web template
# web_include_css = "/assets/pos_extended/css/pos_extended.css"
# web_include_js = "/assets/pos_extended/js/pos_extended.js"

# include js in page
page_js = {"pos": "public/js/pos.js", "point-of-sale": "public/js/point_of_sale.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "pos_extended.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "pos_extended.install.before_install"
# after_install = "pos_extended.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "pos_extended.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"pos_extended.tasks.all"
# 	],
# 	"daily": [
# 		"pos_extended.tasks.daily"
# 	],
# 	"hourly": [
# 		"pos_extended.tasks.hourly"
# 	],
# 	"weekly": [
# 		"pos_extended.tasks.weekly"
# 	]
# 	"monthly": [
# 		"pos_extended.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "pos_extended.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "pos_extended.event.get_events"
# }

