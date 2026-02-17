using AutoMapper;
using Inventory.Server.Dtos;
using Inventory.Server.Models.Core;
using Inventory.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountsController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountDto>>> GetAccounts()
        {
            var accounts = await _accountService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<AccountDto>>(accounts));
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountDto>> GetAccount(int id)
        {
            var account = await _accountService.GetByIdAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<AccountDto>(account));
        }

        // POST: api/Accounts
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AccountDto>> PostAccount(CreateAccountDto createDto)
        {
            var account = _mapper.Map<Account>(createDto);
            account.CreatedDate = DateTime.UtcNow;

            var createdAccount = await _accountService.CreateAsync(account);

            var returnDto = _mapper.Map<AccountDto>(createdAccount);

            return CreatedAtAction(nameof(GetAccount), new { id = createdAccount.AccountId }, returnDto);
        }

        // PUT: api/Accounts/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutAccount(int id, UpdateAccountDto updateDto)
        {
            var accountToUpdate = await _accountService.GetByIdAsync(id);

            if (accountToUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(updateDto, accountToUpdate);
            await _accountService.UpdateAsync(accountToUpdate);

            return NoContent();
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            if (!await _accountService.ExistsAsync(id))
            {
                return NotFound();
            }
            
            await _accountService.DeleteAsync(id);

            return NoContent();
        }
    }
}