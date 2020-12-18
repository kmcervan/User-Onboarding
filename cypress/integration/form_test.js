describe("onboarding app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001");
    });

    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');
    const termsSelect = () => cy.get('input[type="checkbox"]');
    const submitButton = () => cy.get("#submit");
    const error = () => cy.get("#err");


    it("sanity test to make sure tests work", () => {
        // test came back positive!!
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
      });

    it("can type in a name", () => {
        nameInput()
        .should("have.value", "")
        .type("Karla Cervantes")
        .should("have.value", "Karla Cervantes");
    });
    it("can type in an email", () => {
        emailInput()
        .should("have.value", "")
        .type("Karla.Cervantes@me.com")
        .should("have.value", "Karla.Cervantes@me.com");
    });
    it("can type in a password", () => {
        passwordInput()
        .should("have.value", "")
        .type("QW12345")
        .should("have.value", "QW12345");
    });
    it("can select the terms and conditions", () => {
        termsSelect()
        .check();
    });
    it("can submit a form", () => {
        cy.contains("Karla Cervantes (Karla.Cervantes@me.com)").should("not.exist");
        nameInput().type("Karla Cervantes");
        emailInput().type("Karla.Cervantes@me.com");
        passwordInput().type("QW12345");
        termsSelect().check();
        submitButton().click();
    });
    it("can detect when something is not complete", () => {
        nameInput().type("Ka");
        error().should("have.value", "");
        
        submitButton().should("be.disabled");
    } );

    
} )