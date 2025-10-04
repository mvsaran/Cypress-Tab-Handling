# 🚀 Cypress Tab Handling Examples

This repository demonstrates different approaches to handle new tab/window interactions in Cypress tests. Since Cypress doesn't support multiple tabs natively, I've implemented several workarounds to test such scenarios.

## 📋 Test Specifications

### 1. Remove Target Attribute (`HandlewithRemoveAttr.cy.js`)
🎯 **Purpose**: Shows how to handle links that open in new tabs by removing the `target` attribute.
- Demonstrates the simplest approach
- Modifies the link to open in the same tab
- Great for basic scenarios where changing the link behavior is acceptable

### 2. Window.open Stub (`HandlewithStub.cy.js`)
🔍 **Purpose**: Uses Cypress's stubbing capabilities to intercept and handle window.open calls.
- Captures the URL that would open in a new tab
- Navigates to the URL in the same tab
- Perfect for testing links that use JavaScript to open new windows

### 3. Window Open Direct (`HandlewithWindowopen.cy.js`)
🎪 **Purpose**: Handles direct window.open calls in JavaScript.
- Similar to the stub approach but for direct JavaScript navigation
- Shows how to handle programmatic window opening
- Useful when testing JavaScript-triggered navigations

### 4. Href Link Handling (`Handlewithhref.cy.js`)
🔗 **Purpose**: Demonstrates handling simple href links that open in new tabs.
- Works with standard HTML links
- Shows how to extract and use the href attribute
- Ideal for traditional link-based navigation testing

### 5. Parent-Child Tab Navigation (`ParentChildTabHandling.new.cy.js`)
👨‍👦 **Purpose**: Shows a complete example of handling registration flow with new tab navigation.
- Combines multiple techniques
- Handles navigation to registration page
- Verifies page content after navigation
- Returns to parent page
- Great example of real-world tab handling

## 🛠 Key Features

- ✨ Multiple approaches to handle new tab scenarios
- 🔄 Clean and maintainable test code
- ⚡ Reliable test execution
- 🎯 Real-world examples
- 🚦 Error handling and retries
- ⏱ Proper timeout management

## 💻 Running the Tests

To run all tests in headless mode:
```bash
npx cypress run
```

To open Cypress Test Runner:
```bash
npx cypress open
```

## 🎯 Test Strategy

Each spec file demonstrates a different approach because different scenarios might require different solutions. The repository helps you choose the right approach based on your specific needs:

1. Use `RemoveAttr` approach for simple link modifications
2. Use `Stub` approach for complex JavaScript window.open scenarios
3. Use `Windowopen` approach for direct JavaScript navigation
4. Use `href` approach for traditional link handling
5. Combine approaches as shown in `ParentChildTabHandling` for complex flows

## ⚠️ Important Notes

- Cypress doesn't support true multi-tab testing
- All solutions work by keeping navigation in a single tab
- Tests include proper error handling and timeouts
- Each approach has its own use case and trade-offs

## 🔧 Technical Implementation Details

### 1. Remove Target Approach (`HandlewithRemoveAttr.cy.js`)
```javascript
cy.get('#register_Layer')
  .invoke('removeAttr', 'target')  // Remove target="_blank"
  .click();  // Now clicks will stay in same tab
```
This approach:
- Uses Cypress's `invoke()` to remove the target attribute
- Prevents the link from opening in a new tab
- Keeps navigation in the same tab for testing

### 2. Stub Window.open (`HandlewithStub.cy.js`)
```javascript
cy.window().then((win) => {
  cy.stub(win, 'open').as('windowOpen');  // Create stub
});

// After clicking the element that triggers window.open
cy.get('@windowOpen').then((stub) => {
  if (stub.called && stub.args[0]?.[0]) {
    cy.visit(stub.args[0][0]);  // Visit the URL that would've opened in new tab
  }
});
```
This approach:
- Stubs the window.open function before interaction
- Captures the URL that would have opened in a new tab
- Navigates to that URL in the same tab
- Allows verification of the navigation

### 3. Direct Window.open Handling (`HandlewithWindowopen.cy.js`)
```javascript
cy.window().then((win) => {
  const url = win.location.origin + '/registration/createAccount';
  win.location.href = url;  // Direct navigation instead of window.open
});
```
This approach:
- Directly modifies window location
- Avoids window.open completely
- Maintains single-tab context
- Useful for JavaScript-triggered navigations

### 4. Href Attribute Handling (`Handlewithhref.cy.js`)
```javascript
cy.get('a[href*="privacy-policy"]')
  .invoke('attr', 'href')
  .then((href) => {
    cy.visit(href);  // Visit the href URL directly
  });
```
This approach:
- Extracts href attribute from link
- Navigates directly to the URL
- Simplifies link-based navigation testing
- Works well with traditional HTML links

### 5. Combined Approach (`ParentChildTabHandling.new.cy.js`)
```javascript
// Setup window.open stub
cy.window().then((win) => {
  cy.stub(win, 'open').as('windowOpen');
});

// Handle navigation with retry and timeout
cy.get('#register_Layer', { timeout: TIMEOUT })
  .should('exist')
  .should('be.visible')
  .then(($btn) => {
    // Remove target attribute
    cy.wrap($btn)
      .invoke('removeAttr', 'target')
      .click();

    // Check if window.open was called
    cy.get('@windowOpen').then((stub) => {
      if (stub.called && stub.args[0]?.[0]) {
        cy.visit(stub.args[0][0], { 
          failOnStatusCode: false,
          timeout: TIMEOUT 
        });
      }
    });
  });
```
This approach:
- Combines multiple techniques for robust handling
- Includes proper error handling and timeouts
- Handles both attribute and stub-based approaches
- Provides fallback mechanisms
- Ensures reliable navigation verification

## 🎓 Best Practices Implemented

1. **Error Handling**
   ```javascript
   cy.visit(url, { 
     failOnStatusCode: false,  // Handle non-200 responses
     timeout: TIMEOUT         // Custom timeout for slow pages
   });
   ```

2. **Visibility Checks**
   ```javascript
   cy.get(selector)
     .should('exist')        // Element exists in DOM
     .should('be.visible');  // Element is visible to user
   ```

3. **Timeout Management**
   ```javascript
   const TIMEOUT = 10000;  // Configurable timeout
   cy.get(selector, { timeout: TIMEOUT });
   ```

4. **Verification Steps**
   ```javascript
   // Verify navigation success
   cy.url().should('include', expectedPath);
   cy.contains(expectedText).should('be.visible');
   ```

## 🤝 Contributing

Feel free to contribute by:
- Adding new tab handling approaches
- Improving existing tests
- Adding more real-world examples
- Enhancing documentation

## 📝 Author

Saran Kumar
