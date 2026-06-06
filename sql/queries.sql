-- SQL dialect: PostgreSQL

-- 1. Проверяем пользователей без бронирований: помогает найти неиспользуемые аккаунты или сбои в создании booking.
SELECT
    u.id,
    u.name,
    u.email,
    u.created_at
FROM Users u
LEFT JOIN Bookings b ON b.user_id = u.id
WHERE b.id IS NULL;

-- 2. Проверяем пересекающиеся confirmed-бронирования одной комнаты: это помогает выявить критичный дефект double booking.
SELECT
    b1.id AS booking_id_1,
    b2.id AS booking_id_2,
    b1.room_id,
    b1.checkin AS checkin_1,
    b1.checkout AS checkout_1,
    b2.checkin AS checkin_2,
    b2.checkout AS checkout_2
FROM Bookings b1
JOIN Bookings b2
    ON b1.room_id = b2.room_id
   AND b1.id < b2.id
   AND b1.checkin < b2.checkout
   AND b2.checkin < b1.checkout
WHERE b1.status = 'confirmed'
  AND b2.status = 'confirmed';

-- 3. Проверяем топ-3 комнаты по confirmed-бронированиям за последние 30 дней: помогает сверить популярность комнат и корректность отчетов.
SELECT
    r.id AS room_id,
    r.type,
    COUNT(b.id) AS confirmed_bookings_count
FROM Rooms r
JOIN Bookings b ON b.room_id = r.id
WHERE b.status = 'confirmed'
  AND b.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY r.id, r.type
ORDER BY confirmed_bookings_count DESC
LIMIT 3;

-- 4. Проверяем confirmed-бронирования, созданные более 7 дней назад, с уже прошедшим checkin: помогает найти зависшие или некорректно обработанные записи.
SELECT
    id,
    user_id,
    room_id,
    checkin,
    checkout,
    status,
    created_at
FROM Bookings
WHERE status = 'confirmed'
  AND created_at < CURRENT_DATE - INTERVAL '7 days'
  AND checkin < CURRENT_DATE;

-- 5. Проверяем количество confirmed-бронирований по типу комнаты: помогает сверить агрегацию данных для отчетов и статистики.
SELECT
    r.type,
    COUNT(b.id) AS confirmed_bookings_count
FROM Rooms r
JOIN Bookings b ON b.room_id = r.id
WHERE b.status = 'confirmed'
GROUP BY r.type
ORDER BY confirmed_bookings_count DESC;
