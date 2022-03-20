# Check tutorial: [just Django](https://www.youtube.com/watch?v=BxzO2M7QcZw&t=2508s)

The idea is to let all reducers exist independently. Incase a component is not rendered, there is no need to <br>
display unneccesary application state.

Example: <br>
`{is_authenticated && <Route path="/profile" element={<Profile />} />}` <br>
All actions and dispatch methods related to profiles should not be rendered if user is not `authenticated`.