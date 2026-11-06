document.addEventListener("DOMContentLoaded", () => {
    // Cibler tous les formulaires de la page
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.setAttribute("novalidate", "true"); // Désactive la validation HTML5 par défaut pour utiliser la nôtre

        form.addEventListener("submit", (event) => {
            let isValid = true;

            // Réinitialiser les anciens messages d'erreur
            clearErrors(form);

            // 1. Validation du champ Nom / Nom d'équipe
            const nomInput = form.querySelector("#nom, #team_name");
            if (nomInput) {
                if (nomInput.value.trim() === "") {
                    showError(nomInput, "Ce champ est obligatoire.");
                    isValid = false;
                } else if (nomInput.value.trim().length < 2) {
                    showError(nomInput, "Le nom doit contenir au moins 2 caractères.");
                    isValid = false;
                }
            }

            // 2. Validation du Prénom
            const prenomInput = form.querySelector("#prenom");
            if (prenomInput) {
                if (prenomInput.value.trim() === "") {
                    showError(prenomInput, "Le prénom est obligatoire.");
                    isValid = false;
                } else if (prenomInput.value.trim().length < 2) {
                    showError(prenomInput, "Le prénom doit contenir au moins 2 caractères.");
                    isValid = false;
                }
            }

            // 3. Validation de l'E-mail
            const emailInput = form.querySelector("#email, #captain_email");
            if (emailInput) {
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format d'email valide

                if (emailValue === "") {
                    showError(emailInput, "L'adresse e-mail est obligatoire.");
                    isValid = false;
                } else if (!emailRegex.test(emailValue)) {
                    showError(emailInput, "Veuillez entrer une adresse e-mail valide (ex: exemple@domaine.tn).");
                    isValid = false;
                }
            }

            // 4. Validation du Numéro de téléphone 
            const phoneInput = form.querySelector("#telephone, #phone");
            if (phoneInput) {
                const phoneValue = phoneInput.value.trim();
                // Regex vérifiant 
                const phoneRegex = /^\+216[2459][0-9]{7}$/; 

                if (phoneValue === "") {
                    showError(phoneInput, "Le numéro de téléphone est obligatoire.");
                    isValid = false;
                } else if (!phoneRegex.test(phoneValue)) {
                    showError(phoneInput, "Le numéro doit commencer par +216 suivi d'un 2, 4, 5 ou 9 et 7 chiffres (ex: +21622550211).");
                    isValid = false;
                }
            }

            // Bloquer l'envoi du formulaire s'il y a des erreurs
            if (!isValid) {
                event.preventDefault();
            }
        });
    });

    // Fonction d'affichage du message d'erreur
    function showError(inputElement, message) {
        inputElement.classList.add("input-error");
        
        const errorElement = document.createElement("span");
        errorElement.className = "error-message";
        errorElement.innerText = message;
        
        // Insérer le message d'erreur juste après l'input
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }

    // Fonction de réinitialisation des erreurs
    function clearErrors(form) {
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(msg => msg.remove());

        const invalidInputs = form.querySelectorAll(".input-error");
        invalidInputs.forEach(input => input.classList.remove("input-error"));
    }
});