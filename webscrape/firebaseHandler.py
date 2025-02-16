import firebase_admin
from firebase_admin import credentials, firestore

def initialize_firestore(service_key_path="../serviceKey.json"):
    """
    Initialize Firebase Admin SDK and return a Firestore client.
    
    Args:
        service_key_path (str): Relative or absolute path to your Firebase service account key.
    
    Returns:
        firestore.Client: An initialized Firestore client.
    """
    # Initialize the app only once
    try:
        firebase_admin.initialize_app(credentials.Certificate(service_key_path))
    except ValueError:
        # Firebase app already initialized
        pass
    return firestore.client()

def save_product(db, product_data, collection_name="products"):
    """
    Save product data to a specified Firestore collection.
    
    Args:
        db (firestore.Client): The Firestore client.
        product_data (dict): The product information to save.
        collection_name (str): The Firestore collection name.
        
    Returns:
        DocumentReference: A reference to the newly created document.
    """
    doc_ref = db.collection(collection_name).document()  # Auto-generated document ID
    doc_ref.set(product_data)
    return doc_ref

if __name__ == "__main__":
    # For testing purposes: Initialize Firestore and print a confirmation.
    db = initialize_firestore()
    print("Firestore initialized:", db)
