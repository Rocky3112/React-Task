import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [onlyEven, setOnlyEven] = useState(false);

    useEffect(() => {
        // Fetch contacts from API when component mounts
        fetchContacts();
    }, []);

    // Function to fetch contacts from the API
    const fetchContacts = async () => {
        try {
            const response = await fetch('https://contact.mediusware.com/api/contacts');
            if (response.ok) {
                const data = await response.json();
                setContacts(data.contacts);
            } else {
                console.error('Failed to fetch contacts');
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleCheckboxChange = () => {
        setOnlyEven(!onlyEven);
    };

    const filteredContacts = onlyEven ? contacts.filter(contact => contact.id % 2 === 0) : contacts;

    const handleModalAClick = () => {
        setShowModalA(true);
        setShowModalB(false);
        setShowModalC(false);
    };

    const handleModalBClick = () => {
        setShowModalA(false);
        setShowModalB(true);
        setShowModalC(false);
    };

    const handleCloseModalC = () => {
        setShowModalC(false);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <Button variant="outline-primary" onClick={handleModalAClick}>All Contacts</Button>
                    <Button variant="outline-warning" onClick={handleModalBClick}>US Contacts</Button>
                </div>
            </div>

            {/* Modal A */}
            <Modal show={showModalA} onHide={() => setShowModalA(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal A</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {filteredContacts.map(contact => (
                            <li key={contact.id}>{contact.name}</li>
                        ))}
                    </ul>
                    <Form.Check
                        type="checkbox"
                        id="onlyEvenCheckbox"
                        label="Only even"
                        checked={onlyEven}
                        onChange={handleCheckboxChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="" onClick={handleModalAClick} style={{ color: '#46139f',  }}>Button A</Button>
                    <Button variant="" onClick={handleModalBClick} style={{ color: '#ff7f50',  }}>Button B</Button>
                    <Button variant="" onClick={() => setShowModalA(false)} style={{  borderColor: '#46139f' }}>Button C</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal B */}
            <Modal show={showModalB} onHide={() => setShowModalB(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal B</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {filteredContacts.map(contact => (
                            <li key={contact.id}>{contact.name}</li>
                        ))}
                    </ul>
                    <Form.Check
                        type="checkbox"
                        id="onlyEvenCheckbox"
                        label="Only even"
                        checked={onlyEven}
                        onChange={handleCheckboxChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleModalAClick} style={{ color: '#46139f',  }}>Button A</Button>
                    <Button variant="" onClick={handleModalBClick} style={{ color: '#ff7f50',  }}>Button B</Button>
                    <Button variant="" onClick={() => setShowModalB(false)} style={{  borderColor: '#46139f' }}>Button C</Button>

                </Modal.Footer>
            </Modal>

            {/* Modal C */}
            <Modal show={showModalC} onHide={handleCloseModalC}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal C</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Modal C Content
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalC}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Problem2;
