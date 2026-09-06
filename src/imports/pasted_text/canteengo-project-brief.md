MODIFY THE EXISTING CANTEENGO WEBSITE.
DO NOT REDESIGN THE PRODUCT FROM ZERO.
KEEP THE EXISTING CANTEENGO BRAND IDENTITY, GENERAL LAYOUT, AND VISUAL STYLE, BUT APPLY ALL REVISIONS BELOW.

==================================================
PROJECT
==================================================

Product name:
CanteenGo

Tagline:
“Pesan, Bayar, Ambil.”

CanteenGo is a school canteen pre-order website for high school students and canteen vendors.

The website will be used for a real-world school pilot study involving students and canteen vendors.

The main objective is to test whether CanteenGo:
- reduces canteen queues,
- makes ordering faster,
- helps vendors manage orders,
- improves transaction organization,
- provides useful data for evaluating the effectiveness of the system.

Therefore, the website must be designed as a REAL FUNCTIONAL WEB APPLICATION structure, NOT merely a visual prototype.

==================================================
IMPORTANT DATA RULE
==================================================

REMOVE ALL CURRENT DUMMY STATISTICS AND HARDCODED NUMBERS.

All statistics, order counts, menu stock, and order statuses must be designed to come from a database/API.

Do NOT hardcode values such as:
- 47 orders
- Rp465.000 revenue
- 98% satisfaction
- fake historical statistics
- fake number of users

The initial system state must be clean.

==================================================
HOME PAGE STATISTICS
==================================================

1. “PESANAN HARI INI”

Set initial value to:

0

However, this number must NOT be hardcoded.

The number must dynamically represent the actual number of successful orders created TODAY from the database.

Example logic:

Initial state:
Pesanan Hari Ini = 0

After 1 successful order:
Pesanan Hari Ini = 1

After 25 successful orders:
Pesanan Hari Ini = 25

The value must update automatically in real time whenever a new order is created or an existing order changes to the defined successful-order state.

Display:

Pesanan Hari Ini
0

When real users begin ordering, automatically update the number based on real database data.

2. “KANTIN AKTIF”

There are exactly 5 active canteens in the pilot system.

Display:

Kantin Aktif
5

The system must retrieve the count of active canteens from the database.

Do not hardcode “5” as a static UI value.

If a vendor/canteen is deactivated in the future, the number should automatically update.

3. REMOVE “KEPUASAN SISWA”

Completely remove:
- “Kepuasan Siswa”
- “98%”
- any percentage related to student satisfaction

Do not replace it with another fake statistic.

The dashboard should remain visually balanced after removing this statistic.

==================================================
REGISTRATION / FIRST ACCESS
==================================================

Simplify student registration.

When a student enters CanteenGo for the first time, DO NOT require:
- email
- phone number
- complicated account information
- unnecessary personal information

Only ask for:

Nama Lengkap / Nama Panggilan
[________________]

Kelas
[ Pilih Kelas ]

Class options:
- X
- XI
- XII

Primary button:

“Mulai”

The registration process must be very fast and suitable for high school students.

==================================================
STUDENT DATA
==================================================

After registration, save the student's name and class in the application session/database.

Example:

Name:
Adib

Class:
XI

The name displayed on the home page must automatically use the name entered during registration.

Example:

“Selamat datang, Adib 👋”

DO NOT use a fixed name such as:
“Selamat datang, Adib”

The greeting must dynamically display the registered user's actual name.

Example:
If user enters “Raka”:

“Selamat datang, Raka 👋”

If user enters “Fina”:

“Selamat datang, Fina 👋”

The student's class should also be associated with their orders.

==================================================
STUDENT REGISTRATION FLOW
==================================================

Create this flow:

Landing Page
→ Registration
→ Enter Name
→ Select Class (X / XI / XII)
→ Save Student Data
→ Student Home

Make the registration process feel like onboarding rather than a complicated login form.

==================================================
CHECKOUT
==================================================

Add payment method selection to checkout.

Payment methods:

1. Bayar di Kantin
2. QRIS

Display:

Metode Pembayaran

○ Bayar di Kantin
○ QRIS

For QRIS:

Show a QRIS payment section when the user selects QRIS.

UI example:

Metode Pembayaran
[ QRIS ]

Total:
Rp14.000

[ BAYAR DENGAN QRIS ]

Payment status should support:

- Menunggu Pembayaran
- Pembayaran Berhasil
- Pembayaran Gagal

IMPORTANT:

Do not generate fake payment confirmation.

The UI must be prepared so that QRIS can later be connected to a legitimate payment gateway or QRIS provider.

For development/testing, use a TEST/SANDBOX payment flow if supported by the backend.

Do not store sensitive payment information.

==================================================
ORDER CREATION
==================================================

After checkout, create a unique order in the database.

Each order must contain:

- order_id
- student_id
- student_name
- class
- school_id
- vendor_id
- canteen_id
- order_items
- quantity
- total_price
- pickup_time
- payment_method
- payment_status
- order_status
- created_at

Generate a clear order number such as:

A001
A002
A003

The order number must be generated dynamically by the backend/database.

DO NOT hardcode the order number.

==================================================
ORDER STATUS
==================================================

Student order status:

1. Pesanan Diterima
2. Sedang Disiapkan
3. Siap Diambil
4. Selesai

The student must be able to see the latest real status.

Example:

A027

✓ Pesanan Diterima
✓ Sedang Disiapkan
● Siap Diambil
○ Selesai

The status shown to the student must update based on the vendor's actions.

==================================================
VENDOR SIDE
==================================================

Create a separate vendor interface.

Vendor login can use a simple:

Username
Password

The vendor dashboard must show REAL database data.

Dashboard:

Pesanan Hari Ini
[dynamic number]

Pesanan Aktif
[dynamic number]

Pendapatan Hari Ini
[dynamic value]

Menu Terlaris
[dynamic menu]

Do not use fake static numbers.

==================================================
VENDOR ORDER MANAGEMENT
==================================================

Vendor must be able to see real incoming orders.

Table:

Nomor Pesanan
Nama Siswa
Kelas
Pesanan
Total
Waktu Ambil
Metode Pembayaran
Status

Example:

A027 | Adib | XI | Nasi Ayam + Es Teh | Rp14.000 | 10:00 | QRIS | Diproses

Vendor actions:

“Terima Pesanan”
“Proses”
“Siap Diambil”
“Selesai”

When vendor changes status:

DATABASE
→ STUDENT ORDER STATUS
must update accordingly.

Example:

Vendor clicks:
“Siap Diambil”

Student immediately sees:

“Pesanan siap diambil.”

==================================================
REAL-TIME DATA
==================================================

The website must be designed so that important values can update dynamically.

At minimum, the following must use database/API data:

- Pesanan Hari Ini
- Kantin Aktif
- menu availability
- stock
- orders
- order status
- student name
- student class
- vendor order queue
- payment status

Avoid static dummy values.

For MVP, real-time updates can use:
- polling,
- server refresh,
- WebSocket,
- or another simple API-based method.

Prefer the simplest reliable method for short-term development.

==================================================
DATABASE STRUCTURE
==================================================

Prepare the application architecture for these tables/entities:

schools
- id
- name

students
- id
- school_id
- name
- class
- created_at

vendors
- id
- school_id
- name
- canteen_name
- active

menus
- id
- vendor_id
- name
- description
- price
- stock
- image
- active

orders
- id
- order_number
- student_id
- vendor_id
- total_price
- pickup_time
- payment_method
- payment_status
- order_status
- created_at

order_items
- id
- order_id
- menu_id
- quantity
- price

==================================================
INITIAL PILOT DATA
==================================================

Create 5 pilot canteens:

1. Kantin Bu Sari
2. Kantin Putra
3. Kantin Sehat
4. Kantin Cepat
5. Kantin Nusantara

All 5 must initially have:

active = true

Display:

“Kantin Aktif: 5”

Menu stock should be configurable by the vendor.

Do not create unrealistic large dummy order numbers.

Initial order database should be empty.

Therefore:

Pesanan Hari Ini = 0

==================================================
STUDENT HOME PAGE
==================================================

After registration:

Header:

CanteenGo

“Selamat datang, [NAMA SISWA] 👋”

Show:

Istirahat Berikutnya
[time]

Primary button:

“Pesan Sekarang”

Sections:

Kantin Tersedia
Menu Favorit
Pesanan Aktif

The student should be able to:
- browse the 5 active canteens,
- select a canteen,
- browse menus,
- add items,
- change quantity,
- checkout,
- choose payment method,
- receive an order number,
- track the order.

==================================================
CANTEEN PAGE
==================================================

Each canteen should display:

- canteen name
- open/closed status
- available menus
- estimated preparation time

Example:

Kantin Bu Sari
● Buka

12 menu tersedia

5–10 menit

[ Lihat Menu ]

==================================================
MENU PAGE
==================================================

Food cards:

- image
- name
- description
- price
- stock/availability
- quantity selector
- Tambah button

If stock reaches 0:

Display:

“Habis”

Disable ordering for that item.

Stock must update dynamically after a successful order.

==================================================
CHECKOUT PAGE
==================================================

Show:

Nama siswa
Kelas
Pesanan
Total
Waktu pengambilan
Metode pembayaran

Payment options:

Bayar di Kantin
QRIS

Primary button:

“Buat Pesanan”

or

“Bayar dengan QRIS”

depending on payment method.

==================================================
ORDER SUCCESS PAGE
==================================================

Show:

✓ Pesanan Berhasil

Order Number:

A027

Canteen:
Kantin Bu Sari

Student:
Adib

Class:
XI

Pickup:
Istirahat 1

Payment:
QRIS / Bayar di Kantin

Total:
Rp14.000

QR code placeholder can be displayed for order identification.

Button:

“Lihat Status Pesanan”

==================================================
RESEARCH / EVALUATION SUPPORT
==================================================

Because CanteenGo will be used for a school research/pilot study, the system must preserve useful non-sensitive operational data.

The system should be capable of measuring:

- number of orders
- order time
- order completion time
- pickup time
- number of active users
- number of active vendors
- popular menu
- cancelled orders
- completed orders
- payment method
- order status
- daily order volume

Do not display sensitive personal information publicly.

These data will later be used to evaluate:
- efficiency
- usefulness
- ordering speed
- queue reduction
- vendor convenience
- system utilization

==================================================
ADMIN / RESEARCH DASHBOARD
==================================================

Create a simple optional internal dashboard for authorized administrators/researchers.

Do not overcomplicate it.

Display:

Total Orders
Active Students
Active Vendors
Active Canteens
Completed Orders
Cancelled Orders
Average Order Processing Time

Include a simple daily order chart.

IMPORTANT:

All values must come from real database data.

Do not fabricate percentages or satisfaction scores.

==================================================
SECURITY AND DATA
==================================================

Prepare the application for real deployment.

Requirements:

- role-based access
- student cannot access vendor dashboard
- vendor cannot access another vendor's data
- data must be separated by school
- passwords must never be displayed
- use HTTPS in production
- validate all form inputs
- prevent duplicate orders
- prevent ordering unavailable stock
- prevent unauthorized modification of order status

Use environment variables for:
- database credentials
- API keys
- payment gateway keys
- secret keys

Never expose secret keys in frontend code.

==================================================
MULTI-SCHOOL READINESS
==================================================

The system should be architected so CanteenGo can later support multiple schools.

Every major entity should be associated with:

school_id

Example:

School A
→ students
→ vendors
→ menus
→ orders

School B
→ students
→ vendors
→ menus
→ orders

A student from School A must never see data from School B.

==================================================
DEPLOYMENT READINESS
==================================================

Prepare the website structure for deployment to a real domain and server.

Do not assume local-only operation.

Separate:

Frontend
Backend/API
Database

The frontend should communicate with backend API endpoints.

Recommended conceptual API structure:

POST /api/students/register
GET /api/canteens
GET /api/canteens/:id/menus
POST /api/orders
GET /api/orders/:id
GET /api/students/:id/orders
POST /api/vendor/login
GET /api/vendor/orders
PATCH /api/vendor/orders/:id/status
GET /api/vendor/menu
POST /api/vendor/menu
PATCH /api/vendor/menu/:id

The exact technology can remain flexible.

The important requirement is that the UI must be prepared to consume real API/database data rather than static dummy content.

==================================================
MVP PRIORITY
==================================================

Prioritize functionality over excessive visual features.

The core working flow must be:

STUDENT:

Register
→ Name + Class
→ Home
→ Choose Canteen
→ Choose Menu
→ Cart
→ Checkout
→ Select Payment
→ Create Order
→ Receive Order Number
→ Track Order

VENDOR:

Login
→ Dashboard
→ Receive Real Order
→ Process Order
→ Mark Ready
→ Mark Completed

==================================================
DO NOT ADD
==================================================

Do NOT add:
- student satisfaction percentage
- fake statistics
- 98% score
- fake order counts
- fake revenue
- unnecessary chatbot
- unnecessary AI features
- loyalty points
- social media
- delivery service
- complicated administrator features
- external Google Forms
- external Google Sheets
- unnecessary registration fields

==================================================
FINAL EXPECTATION
==================================================

The final CanteenGo website must feel like a real deployable school technology product.

It must be:
- simple
- fast
- mobile friendly
- easy for students
- easy for vendors
- database-ready
- API-ready
- domain-ready
- suitable for real-world school testing

Most importantly:

DO NOT USE STATIC NUMBERS WHERE REAL DATA SHOULD EXIST.

Initial state:
Pesanan Hari Ini = 0
Kantin Aktif = 5
Student Satisfaction = REMOVED

Student registration:
Name + Class X/XI/XII only

Home greeting:
Dynamic registered name

Checkout:
QRIS

The website should be ready to connect to a production database/server and be tested by real students and canteen vendors.