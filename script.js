'use strict'

const form = document.querySelector('#registrationForm')

const formValidation = () => {
      form.setAttribute('novalidate', '')
      form.addEventListener('submit', e => {
            e.preventDefault();

            validateFormDetails(form)
      })
      Array.from(form)
      const validateOptions = [

            {
                  attribute: 'minlength',
                  isValid: input => input.value && input.value.length >= input.minLength,
                  errorMessage: (input, label) => `${label.textContent} needs to be atleast ${input.minLength} characters`
            },

            {
                  attribute: 'required',
                  isValid: input => input.value.trim() !== '',
                  errorMessage: (input, label) => `${label.textContent} is required, kindly fill this field`
            },
            
            {
                  attribute: 'custommaxlenght',
                  isValid: input => input.value && input.value.length <= input.getAttribute('custommaxlenght'),
                  errorMessage: (input, label) => `${label.textContent} is to be ${input.getAttribute('custommaxlenght')} or less than ${input.getAttribute('custommaxlenght')} characters `
            },

            {
                  attribute: 'pattern',
                  isValid: input => {
                        const regex = new RegExp(input.pattern)
                        return regex.test(input.value)
                        console.log(regex)
                  },
                  errorMessage: (input,label) => `${input.value} is not valid ${label.textContent}`
            },

            {
                  attribute: 'match',
                  isValid: input => {
                        const selectorEl = input.getAttribute('match');
                        const elToMatch = form.querySelector(`#${selectorEl}`)
                        return elToMatch && elToMatch.value.trim() === input.value.trim()
                  },
                  errorMessage:(input, label) => {
                        const selectorEl = input.getAttribute('match');
                        const elToMatch = form.querySelector(`#${selectorEl}`)
                        const elToMatchLabel = elToMatch.parentElement.parentElement.querySelector('label')

                        return `${label.textContent} must match ${elToMatchLabel.textContent}`
                  }
            }

      ]
      
      const validateSingleDetails = (formDetail) => {
      
            const label = formDetail.querySelector('label')
            const input = formDetail.querySelector('input')
            const success = formDetail.querySelector('#check')
            const errorIcon = formDetail.querySelector('#err')
            const errorMessEl = formDetail.querySelector('.errorMessage')
      
            let errorDetail = false
      
            for (const options of validateOptions) {
                  if(input.hasAttribute(options.attribute) &&  !options.isValid(input)){
                        errorMessEl.textContent = options.errorMessage(input, label)
                        input.classList.remove('greenBorder')
                        input.classList.add('redBorder')
                        errorIcon.style.display = 'inline'
                        success.style.display = 'none'

                        errorDetail = true;
                  }
                  if (!errorDetail){
                        errorMessEl.textContent = ''
                        input.classList.add('greenBorder')
                        input.classList.remove('redBorder')
                        errorIcon.style.display = 'none'
                        success.style.display = 'inline'
      
                  }
            }
      }
      
      const validateFormDetails = (formToValidate) =>{
            const formDetailsEl = Array.from(formToValidate.querySelectorAll('.formDetails'))
            console.log(formDetailsEl)
            formDetailsEl.forEach((formDetail) => {
                  validateSingleDetails(formDetail)
            })
      }
    
}


formValidation()