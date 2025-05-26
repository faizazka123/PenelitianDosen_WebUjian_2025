<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClearExpiredExamCodes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-expired-exam-codes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiredTime = now()->subMinutes(15);

        $updated = \App\Models\Ujian::whereNotNull('kodeUjian')
            ->where('kodeUjian_created_at', '<', $expiredTime)
            ->update([
                'kodeUjian' => null,
                'kodeUjian_created_at' => null,
            ]);

        $this->info("Kode ujian yang kadaluarsa berhasil dihapus: $updated");
    }
}
