import '@testing-library/jest-dom';
import { fireEvent, render,screen } from '@testing-library/react';



describe("tests home page component",()=>{
    test('starter test',async()=>{
        render(<div data-testid='container'>hello</div>);
        let element=await screen.findByTestId('container');
        expect(element).toBeInTheDocument()
    })

    it('secon test',()=>{
        render(<div>second component</div>)
        let element=screen.getByText('second component')
        expect(element).toBeInTheDocument()
    })

})

// it('rendering body when search',()=>{
//     write mock fecth function
// })