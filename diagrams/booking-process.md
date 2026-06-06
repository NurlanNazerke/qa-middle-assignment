# Task 5: Booking Process Documentation and Diagrams

## BPMN: Booking Creation and Cancellation Process

The diagram describes the main user flow for creating a booking and two exception paths:

- room is not available;
- payment is not successful.

```mermaid
flowchart TD
    start((Start)) --> selectRoom[User selects room]
    selectRoom --> enterDates[User enters check-in and checkout dates]
    enterDates --> submitBooking[User submits booking request]
    submitBooking --> availability{Is room available?}

    availability -- No --> showUnavailable[Frontend shows room unavailable message]
    showUnavailable --> endUnavailable((Booking not created))

    availability -- Yes --> enterPayment[User enters payment details]
    enterPayment --> payment{Is payment successful?}

    payment -- No --> showPaymentError[Frontend shows payment error]
    showPaymentError --> retryOrCancel{Retry payment?}
    retryOrCancel -- Yes --> enterPayment
    retryOrCancel -- No --> cancelPending[System cancels pending booking]
    cancelPending --> endPaymentFailed((Booking not confirmed))

    payment -- Yes --> createBooking[API creates confirmed booking]
    createBooking --> saveBooking[Database saves booking]
    saveBooking --> sendEmail[Email Service sends confirmation email]
    sendEmail --> showSuccess[Frontend shows booking confirmation]
    showSuccess --> endSuccess((Booking confirmed))
```

## Sequence Diagram: Booking Creation

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Database
    participant EmailService as Email Service

    User->>Frontend: Select room and dates
    Frontend->>API: Send booking creation request
    API->>Database: Check room availability
    Database-->>API: Availability result

    alt Room is available
        API->>Database: Create booking
        Database-->>API: Booking created
        API->>EmailService: Send booking confirmation
        EmailService-->>API: Confirmation email sent
        API-->>Frontend: Return successful booking response
        Frontend-->>User: Show booking confirmation
    else Room is unavailable
        API-->>Frontend: Return availability error
        Frontend-->>User: Show room unavailable message
    end
```

## State Transition: Booking Object

```mermaid
stateDiagram-v2
    [*] --> pending: Booking request created
    pending --> confirmed: Payment successful
    pending --> cancelled: User cancels before payment
    pending --> cancelled: Payment failed
    confirmed --> cancelled: User cancels booking
    confirmed --> completed: Checkout date passed
    cancelled --> [*]
    completed --> [*]
```

## State Transition Test Coverage

The following Booking state transitions should be covered by tests:

- `pending -> confirmed`: verifies that a booking is confirmed only after successful payment and successful room availability check.
- `pending -> cancelled`: verifies cancellation before payment and cancellation after failed payment.
- `confirmed -> cancelled`: verifies that a user can cancel an active confirmed booking according to business rules.
- `confirmed -> completed`: verifies that the system correctly completes a booking after the checkout date has passed.

Negative transition checks are also important: the system should not allow `cancelled -> confirmed`, `completed -> cancelled`, or creation of a `confirmed` booking when the room is unavailable or payment fails.
